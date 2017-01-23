//
//  Song.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 14/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit
import Alamofire

class Song {
    var title: String
    var artist: String
    var photo: UIImage?
    var url_photo: String
    
    init?(title: String, artist: String, url_photo: String, table: UITableView) {
        self.title = title
        self.artist = artist
        self.url_photo = url_photo
        
        let preferences = UserDefaults.standard
        
        if (preferences.object(forKey: url_photo) != nil){
            let Data = preferences.object(forKey: url_photo) as! Data
            self.photo = UIImage(data: Data)
            
            OperationQueue.main.addOperation {
                table.reloadData()
            }
        }
        else {
            Alamofire.request("http://lightthemup.fr.nf:3000/"+url_photo).responseData { response in
                if let data = response.result.value {
                    self.photo = UIImage(data: data)
                    
                    let photo = UserDefaults.standard
                    photo.set(data, forKey: url_photo)
                    photo.synchronize()
                }
                OperationQueue.main.addOperation {
                    table.reloadData()
                }
            }
        }
    }
}
