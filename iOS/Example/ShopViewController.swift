//
//  ShopViewController.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 12/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit
import SideMenuController
import Alamofire
import JASON

class ShopViewController: UITableViewController, SideMenuControllerDelegate {
    
    var items = [ShopItem]()
    var test:Int?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "Shop"
       // self.navigationItem.tintColor = UIColor.white
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 9/255, green: 211/255, blue: 171/255, alpha:  0.5)
        sideMenuController?.delegate = self
        loadSampleItems()
    }
    
    func loadSampleItems() {
        
        Alamofire.request("http://lightthemup.fr.nf:3000/songs", method: .get).responseJSON { response in
            
            if let json = response.result.value {
                
                let all = JSON(json)
                print(all)
                for item in all {

                    guard let title = item["name"].string else { return }
                    guard let id = item["_id"].string else { return }
                    guard let artist = item["artist"].string else { return }
                    guard let difficult = item["difficulty"].int else { return }
                    guard let price = item["price"].float else { return }
                    guard let file = item["file"].string else { return }
                    guard let preview = item["preview"].string else { return }
                    guard let url_picture = item["picture"].string else { return }
                    
                    //let photo = UIImage(named: "filledStar")!
                    self.items.append(ShopItem(title: title, id: id, artist: artist, difficulty: difficult, url_picture: url_picture, price: price, file: file, preview: preview, table: self.tableView)!)
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
        return items.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "ShopCell"
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! ShopItemTableViewCell
        
        let song = items[(indexPath as NSIndexPath).row]
        
        cell.titleSong.text = song.title
        cell.imageSong.image = song.photo
        cell.artistSong.text = song.artist
        //cell.downloadSong.text = String(song.difficulty)
        cell.priceSong.text = String(song.price)+" $"
        
        cell.title = song.title
        cell.idSong = song.id
        cell.artist = song.artist
        cell.price = song.price
        cell.photo = song.photo
        cell.previewUrl = song.preview
        cell.fileUrl = song.file
        
        
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
    
    @IBAction func previewSong(_ sender: Any) {
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
