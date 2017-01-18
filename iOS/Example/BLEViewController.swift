//
//  BLEViewController.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 13/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import CoreBluetooth
import UIKit
import SideMenuController

class BLEViewController: UIViewController, CBCentralManagerDelegate, CBPeripheralDelegate, UITableViewDelegate, UITableViewDataSource, SideMenuControllerDelegate {

    
    @IBOutlet weak var refresh: UIBarButtonItem!
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var loading: UIActivityIndicatorView!

    var ConnectingPeripheral: CBPeripheral!
    var centralManager: CBCentralManager?
    let UUID = CBUUID(string: "25A0BE43-1D04-4881-9650-F7D2A2C89DA8")
    var writeCharac: CBCharacteristic!
    var peripherals = [Peripheral]()
    //fileprivate var transferCharacteristic: CBMutableCharacteristic?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "KeyLite"
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 9/255, green: 211/255, blue: 171/255, alpha:  0.5)
        sideMenuController?.delegate = self
        
        self.centralManager = CBCentralManager(delegate: self, queue: DispatchQueue.main)
    }
    
    func centralManagerDidUpdateState(_ central: CBCentralManager)
    {
        if (central.state == CBManagerState.poweredOn){
            
            self.centralManager?.scanForPeripherals(withServices: nil, options: nil)
        }
        else {
            let toast = Toast(view: self.view, msg: "Bluetooth is powerOff")
            toast!.Show()
        }
    }
    
    func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber)
    {
        if let peripheralName = peripheral.name {
            
            let identifier = "\(peripheral.identifier)".substring(from: "\(peripheral.identifier)".characters.index("\(peripheral.identifier)".startIndex, offsetBy: 31))
            if (self.findByIdentifier(peripherals, PeripheralName: peripheralName) == false){
                //print("GOOD \(peripheral)")
                peripherals.append(Peripheral(Name: peripheralName, UUID: identifier, RSSI: RSSI, peripheral: peripheral)!)
                tableView.reloadData()
            }
        }
    }
    
    fileprivate func findByIdentifier(_ Peripherals: Array<Peripheral>, PeripheralName: String) -> Bool {
        
        for peripheral in Peripherals {
            if (peripheral.Name == PeripheralName){
                return true
            }
        }
        return false
    }
    
    @IBAction func refreshData(_ sender: Any) {
        self.peripherals.removeAll()
        self.centralManager?.scanForPeripherals(withServices: nil, options: nil)
    }
    
    func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        
        self.centralManager?.stopScan()
        if let peripheralName = peripheral.name {
            self.ConnectingPeripheral = peripheral
            let toast = Toast(view: self.view, msg: "connected to \(peripheralName)")
            toast!.Show()
            peripheral.delegate = self
            peripheral.discoverServices(nil)
            
            Singleton.sharedInstance.connectedDevice = peripheral
            self.loading.stopAnimating()
        }
    }
    
    func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
        self.loading.startAnimating()
        self.centralManager?.scanForPeripherals(withServices: nil, options: nil)
    }
    
    func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        
        if let servicePeripherals = peripheral.services {
            for servicePeripheral in servicePeripherals {
                peripheral.discoverCharacteristics(nil, for: servicePeripheral)
            }
        }
    }
    
    func peripheral(_ peripheral: CBPeripheral, didWriteValueFor characteristic: CBCharacteristic, error: Error?) {
        
        print("error \(error)")
    }
    
    func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
        
        
        for charac in service.characteristics! {
            
            print("charac \(charac.uuid.uuidString)")
            
        }
    }
    
    func stopScan() {
            }
    
    func sideMenuControllerDidHide(_ sideMenuController: SideMenuController) {
        print(#function)
    }
    
    func sideMenuControllerDidReveal(_ sideMenuController: SideMenuController) {
        print(#function)
    }
    
    func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath)
    {
    let additionalSeparatorThickness = CGFloat(5)
    let additionalSeparator = UIView(frame: CGRect(x: 0, y: (cell.frame.size.height - additionalSeparatorThickness) + 1, width: cell.frame.size.width, height: additionalSeparatorThickness))
    additionalSeparator.backgroundColor = UIColor.clear
    additionalSeparator.alpha = CGFloat(0.5)
    
    cell.backgroundColor = .clear
    cell.contentView.backgroundColor = UIColor.clear
    
    cell.contentView.addSubview(additionalSeparator)
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath){
        
        let peripheral = peripherals[(indexPath as NSIndexPath).row]
        self.centralManager?.connect(peripheral.Peripheral, options: nil)
        self.showTextOverlay("Loading")
    }
    
    //UITableView methods
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell
    {
        let cell:UITableViewCell = self.tableView.dequeueReusableCell(withIdentifier: "deviceCell")! as UITableViewCell
        
        let peripheral = peripherals[(indexPath as NSIndexPath).row]
        cell.textLabel?.text = peripheral.Name
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return CGFloat(80)
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int
    {
        return peripherals.count
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
    }
}
