//
//  PlaylistViewController.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 14/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit
import Alamofire
import JASON
import SideMenuController

class PlaylistViewController: UITableViewController {
    
    var token: String!
    var playlist = [Playlist]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "Songs"
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 9/255, green: 211/255, blue: 171/255, alpha:  0.5)
        
        let preferences = UserDefaults.standard
        
        if preferences.object(forKey: "token") != nil {
            self.token = preferences.value(forKey: "token") as! String
        }
        else {
            self.token = ""
        }
        print("token \(self.token)")
        self.loadSampleItems()
    }
    
    func loadSampleItems() {
        
        let headers: HTTPHeaders = [
            "x-access-token": self.token
        ]
        
        Alamofire.request("http://lightthemup.fr.nf:3000/playlists/user", method: .get, headers: headers).responseJSON { response in
            
            if let json = response.result.value {
                
                let all = JSON(json)
                //let songs = all["songs"]
                
                //print(all)
                for item in all {
                    
                   guard let name = item["name"].string else { return }
                    guard let songs = item["songs"].array else { return }
                    guard let update = item["updatedAt"].string else { return }
                    guard let create = item["createdAt"].string else { return }
                    
                    self.playlist.append(Playlist(name: name, number: String(songs.count), update: update, created: create)!)
                }
            }
            OperationQueue.main.addOperation {
                self.tableView.reloadData()
            }
        }
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat
    {
        return CGFloat(80) //Choose your custom row height
    }

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        let selectedCell:UITableViewCell = tableView.cellForRow(at: indexPath)!
        selectedCell.contentView.backgroundColor = UIColor(red: 15/255, green: 15/255, blue: 15/255, alpha: 0.3)
        if let indexPath = tableView.indexPathForSelectedRow
        {
            tableView.deselectRow(at: indexPath, animated: false)
        }
    }
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.playlist.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "PlaylistCell"
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! PlaylistViewCell
        
        let playlist_content = playlist[(indexPath as NSIndexPath).row]
        
            cell.name.text = playlist_content.name
            cell.number.text = playlist_content.number
        
        return cell
    }
    
    override func tableView(_ tableView: UITableView, editActionsForRowAt indexPath: IndexPath) -> [UITableViewRowAction]? {
        
        
        let remove = UITableViewRowAction(style: .normal, title: "Remove") { action, index in
            let playlistRM = self.playlist[indexPath.row]
            //self.removePlaylist(pl: playlistRM)
            //print("\(playlistRM.name)   \(playlistRM.id)")
        }
        remove.backgroundColor = UIColor.red
        
        let edit = UITableViewRowAction(style: .normal, title: "Rename") { action, index in
            print("edit action")
        }
        edit.backgroundColor = UIColor.orange
        
        
        return [remove, edit]
    }
    
    @IBAction func newPlaylist(_ sender: Any) {
    }
    
    @IBAction func back(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
    }
}
