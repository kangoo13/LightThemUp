//
//  AchievViewController.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 12/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit
import SideMenuController
import Alamofire
import JASON

class AchievViewController: UITableViewController, SideMenuControllerDelegate {
    
    var achievs = [Achievment]()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "Achievment"
        //self.navigationBar.tintColor = UIColor.white
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 9/255, green: 211/255, blue: 171/255, alpha:  0.5)
        sideMenuController?.delegate = self
        self.loadSampleItems()

    }
    
    func loadSampleItems() {
        
        Alamofire.request("http://lightthemup.fr.nf:3000/achievements", method: .get).responseJSON { response in
            
            if let json = response.result.value {
                
                let achievs = JSON(json)
                
                print(achievs)
                for achiev in achievs {
                    /*guard let id = achievs["_id"].string else {
                        let toast = Toast(view: self.view, msg: "fail id")
                        toast?.Show()
                        return
                    }*/
                    guard let title = achiev["name"].string else {
                        let toast = Toast(view: self.view, msg: "fail name")
                        toast?.Show()
                        return
                    }
                    guard let desc = achiev["description"].string else {
                        let toast = Toast(view: self.view, msg: "fail desc")
                        toast?.Show()
                        return
                    }
                    guard let url_photo = achiev["picture"].string else {
                        let toast = Toast(view: self.view, msg: "fail picture")
                        toast?.Show()
                        return
                    }
                    
                    self.achievs.append(Achievment(title: title, descrip: desc, url_photo: url_photo, table: self.tableView)!)
                }
            }
            OperationQueue.main.addOperation {
                self.tableView.reloadData()
            }
        }
    }
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return achievs.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        // Table view cells are reused and should be dequeued using a cell identifier.
        let cellIdentifier = "AchievCell"
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! AchievmentTableViewCell
        
        // Fetches the appropriate meal for the data source layout.
        let achiev = achievs[(indexPath as NSIndexPath).row]
        
        cell.titleAchiev.text = achiev.title
        cell.descripAchiev.text = achiev.descrip
        cell.imageAchiev.image = achiev.photo
        
        return cell
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
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
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
