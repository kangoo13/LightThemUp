//
//  MenuController.swift
//  Example
//
//  Created by Teodor Patras on 16/06/16.
//  Copyright © 2016 teodorpatras. All rights reserved.
//

import UIKit
import Alamofire
import JASON
import Social
import CoreBluetooth

class MenuController: UITableViewController  {
    
    let segues = ["showUserController", "showSongsController", "keylite", "showScanController", "showShopController", "showAchievController", "facebook", "twitter", "log_out"]
    private var previousIndex: NSIndexPath?
    var User: UserItem!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        //self.loadDevice()
    }
    
    func loadDevice() {
        let index = IndexPath(row: 2, section: 0)
        let cell = self.tableView.cellForRow(at: index) as! MenuCellViewController
        
        if let device: CBPeripheral = Singleton.sharedInstance.connectedDevice {
            print("okkkkkkkkk")
            cell.title.text = device.name
        }
        else {
            print("noooope")
            cell.title.text = "Keylite"
        }
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
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return segues.count
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat
    {
        if(indexPath.row == 0) {
            return CGFloat(150)
        }
        
        return CGFloat(70) //Choose your custom row height
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
       
            if (indexPath.row == 0) {
                let cell = tableView.dequeueReusableCell(withIdentifier: "userCell")!
                return cell
            }
            else {
                let cell = tableView.dequeueReusableCell(withIdentifier: "basicCell", for: indexPath) as! MenuCellViewController
                
                //TODO: trad
                switch indexPath.row {
                    case 1:
                        cell.title.text = "Songs"
                        cell.icon.image = UIImage(named: "music")
                        return cell
                    case 2:
                        /*if let device: CBPeripheral = Singleton.sharedInstance.connectedDevice {
                            print("okkkkkkkkk")
                            cell.title.text = device.name
                        }
                        else {
                            cell.title.text = "Keylite"
                        }*/
                        cell.title.text = "Keylite"
                        cell.icon.image = UIImage(named: "bluetooth")
                        return cell
                    case 3:
                        cell.title.text = "Scan"
                        cell.icon.image = UIImage(named: "camera")
                        return cell

                    case 4:
                        cell.title.text = "Shop"
                        cell.icon.image = UIImage(named: "shop")
                        return cell

                    case 5:
                        cell.title.text = "Achievement"
                        cell.icon.image = UIImage(named: "cup")
                        return cell
                    case 6:
                        cell.title.text = "Share on Facebook"
                        cell.title.textColor = UIColor.white
                        cell.icon.image = UIImage(named: "facebook")
                        cell.contentMenu.backgroundColor = UIColor(red: 59/255, green: 89/255, blue: 152/255, alpha: 1)
                        return cell
                    case 7:
                        cell.title.text = "Share on Twitter"
                        cell.title.textColor = UIColor.white
                        cell.icon.image = UIImage(named: "twitter")
                        cell.contentMenu.backgroundColor = UIColor(red: 85/255, green: 172/255, blue: 238/255, alpha: 1)
                        return cell
                    case 8:
                        cell.title.text = "Disconnect"
                        cell.icon.image = UIImage(named: "log_out")
                        return cell
                    default:
                        return  cell
                }
            }
    }
    
   /* func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
     
    }*/

    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath)  {
        
        let selectedCell:UITableViewCell = tableView.cellForRow(at: indexPath)!
        selectedCell.contentView.backgroundColor = UIColor(red: 15/255, green: 15/255, blue: 15/255, alpha: 0.3)
       
        if let indexPath = tableView.indexPathForSelectedRow
        {
            tableView.deselectRow(at: indexPath, animated: false)
        }
        
        if (indexPath.row != 6 && indexPath.row != 7 && indexPath.row != 8) {
            if let index = previousIndex {
                tableView.deselectRow(at: index as IndexPath, animated: true)
            }
        
            sideMenuController?.performSegue(withIdentifier: segues[indexPath.row], sender: nil)
            previousIndex = indexPath as NSIndexPath?
        }
        
        switch indexPath.row {
            case 6:
                if let vc = SLComposeViewController(forServiceType: SLServiceTypeFacebook) {
                    
                    //vc.add(URL(string: "https://itunes.apple.com/app/id1182972110"))
                    present(vc, animated: true)
                }
                print("fb")
                break
            case 7:
                if let vc = SLComposeViewController(forServiceType: SLServiceTypeTwitter) {
                    
                    //vc.add(URL(string: "https://itunes.apple.com/app/id1182972110"))
                    present(vc, animated: true)
                }
                print("twitter")
                break
            case 8:
                for key in Array(UserDefaults.standard.dictionaryRepresentation().keys) {
                    if (key != "email"){
                        UserDefaults.standard.removeObject(forKey: key)
                    }
                }
                let storyboard = UIStoryboard(name: "Main", bundle: nil)
                let controller = storyboard.instantiateViewController(withIdentifier: "login")
                self.present(controller, animated: true, completion: nil)
                break
            default: break
        }
    }
    
}
