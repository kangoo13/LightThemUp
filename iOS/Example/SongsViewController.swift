//
//  SongsViewController.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 12/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import CoreBluetooth
import UIKit
import SideMenuController
import Alamofire
import JASON
import CoreData

class SongsViewController: UITableViewController, NSFetchedResultsControllerDelegate, SideMenuControllerDelegate {
    
    var songs = [Song]()
    var url_picture = [String]()
    var Pirctures = [UIImage]()
    var User_ID: String!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "Songs"
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 9/255, green: 211/255, blue: 171/255, alpha:  0.5)
        sideMenuController?.delegate = self
        
        let preferences = UserDefaults.standard
        
        if preferences.object(forKey: "user_id") != nil {
            self.User_ID = preferences.value(forKey: "user_id") as! String
        }
        loadSampleItems()
    }
    
    private func loadSampleItems() {
        
        //TODO: alamofire
        Alamofire.request("http://lightthemup.fr.nf:3000/users/"+self.User_ID, method: .get).responseJSON { response in
            
            if let json = response.result.value {
                
                let all = JSON(json)
                let songs = all["songs"]
                
                for song in songs {
                    guard let title = song["slug"].string else { return }
                    guard let artist = song["artist"].string else { return }
                    guard let url_photo = song["picture"].string else { return }
                    
                    self.songs.append(Song(title: title, artist: artist, url_photo: url_photo, table: self.tableView)!)
                    self.url_picture.append(url_photo)
                }
            }
            OperationQueue.main.addOperation {
                self.tableView.reloadData()
            }
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "showDetail" {
            if let indexPath = self.tableView.indexPathForSelectedRow {
                let object = self.songs[indexPath.row]
                let nav = segue.destination as! UINavigationController
                let controller = nav.topViewController as! PlayerViewController
                controller.detailItem = object
                /*let controller = segue.destination as! PlayerViewController
                controller.detailItem = object*/
                /*let storyboard = UIStoryboard(name: "Main", bundle: nil)
                let controller = storyboard.instantiateViewController(withIdentifier: "PlayerCtrl") as! PlayerViewController
                controller.detailItem = object
                self.present(controller, animated: true, completion: nil)*/
                //let controller = segue.destination as! PlayerViewController//(segue.destination as! UINavigationController).topViewController as! PlayerViewController
                //controller.detailItem = object
            }
        }
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat
    {
        return CGFloat(100) //Choose your custom row height
    }
    
    override func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath)
    {
        let additionalSeparatorThickness = CGFloat(5)
        let additionalSeparator = UIView(frame: CGRect(x: 0, y: (cell.frame.size.height - additionalSeparatorThickness) + 1, width: cell.frame.size.width, height: additionalSeparatorThickness))
        additionalSeparator.backgroundColor = UIColor.clear
        additionalSeparator.alpha = CGFloat(0.5)
        
        cell.backgroundColor = .clear
        cell.contentView.backgroundColor = UIColor.clear
        
        cell.contentView.addSubview(additionalSeparator)
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        let selectedCell:UITableViewCell = tableView.cellForRow(at: indexPath)!
        selectedCell.contentView.backgroundColor = UIColor(red: 15/255, green: 15/255, blue: 15/255, alpha: 0.3)
        if let indexPath = tableView.indexPathForSelectedRow
        {
            tableView.deselectRow(at: indexPath, animated: false)
        }
        
       // let userdef = UserDefaults.standard
        
        /*if let device: CBPeripheral = userdef.object(forKey: "deviceConnected") as! CBPeripheral? {
            print("lol")
            
            let data = "1"
            //device.writeValue(data, for: <#T##CBCharacteristic#>, type: <#T##CBCharacteristicWriteType#>)
        }*/
        if let device = Singleton.sharedInstance.connectedDevice {
            print("c'est good  \(device.name)")
        }
        else {
            let toast = Toast(view: self.view, msg: "Device not found")
            toast?.Show()
        }
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return songs.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "SongCell"
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! SongsTableViewCell
        
        let song = songs[(indexPath as NSIndexPath).row]
        
        cell.titleSong.text = song.title
        cell.imageSong.image = song.photo
        cell.artistSong.text = song.artist
        
        return cell
    }
    
    
    
    override func tableView(_ tableView: UITableView, editActionsForRowAt indexPath: IndexPath) -> [UITableViewRowAction]? {
        
        
        let remove = UITableViewRowAction(style: .normal, title: "Remove") { action, index in
            print("favorite button tapped")
        }
        remove.backgroundColor = UIColor.red
        
        return [remove]
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        let check = CheckToken(ctrl: self)
        check.checkTokenInHome()
        //check.checkToken()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
    }
    
    func sideMenuControllerDidHide(_ sideMenuController: SideMenuController) {
        print(#function)
    }
    
    func sideMenuControllerDidReveal(_ sideMenuController: SideMenuController) {
        print(#function)
    }
}
