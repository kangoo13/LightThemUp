//
//  ShopItem.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 14/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit
import Alamofire


class ShopItem {
    var title: String
    var id: String
    var artist: String
    var file: String
    var preview: String
    var difficulty: Int
    var photo: UIImage?
    var url_picture: String
    var price: Float
    
    init?(title: String, id: String, artist: String, difficulty: Int, url_picture: String, price: Float, file: String, preview: String, table: UITableView) {
        self.title = title
        self.id = id
        self.artist = artist
        self.difficulty = difficulty
        self.url_picture = url_picture
        self.price = price
        self.preview = preview
        self.file = file
        
        let preferences = UserDefaults.standard
        
        if (preferences.object(forKey: url_picture) != nil){
            let Data = preferences.object(forKey: url_picture) as! Data
            self.photo = UIImage(data: Data)
            
            OperationQueue.main.addOperation {
                table.reloadData()
            }
        }
        else {
            Alamofire.request("http://lightthemup.fr.nf:3000/"+url_picture).responseData { response in
                if let data = response.result.value {
                    self.photo = UIImage(data: data)
                    let photo = UserDefaults.standard
                    photo.set(data, forKey: url_picture)
                    photo.synchronize()
                }
                OperationQueue.main.addOperation {
                    table.reloadData()
                }
            }
        }
    }
}
