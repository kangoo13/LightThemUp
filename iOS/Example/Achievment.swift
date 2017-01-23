//
//  Achievment.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 14/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit
import Alamofire

class Achievment {
    var photo: UIImage?
    var url_photo: String
    var table: UITableView
    var title: String?
    var descrip: String?
    
    //var date:
    
    init?(title: String, descrip: String, url_photo: String, table: UITableView) {
        self.title = title
        self.descrip = descrip
        self.url_photo = url_photo
        self.table = table
        
        print("go")
        let preferences = UserDefaults.standard
        
        if let data: Data = preferences.object(forKey: url_photo) as! Data? {
            print("if")
            //let Data = data//preferences.object(forKey: id) as! Data
            self.photo = UIImage(data: data)
            
            OperationQueue.main.addOperation {
                table.reloadData()
            }
        }
        else {
            print("else")
            Alamofire.request("http://lightthemup.fr.nf:3000/"+url_photo).responseData { response in
                
                if (response.result.isFailure) {
                    print("fail")
                    self.photo = UIImage(named: "cup")
                }
                
                if (response.result.isSuccess) {
                    print("success")
                }
                
                if let data = response.result.value {
                    self.photo = UIImage(data: data)
                    
                    let photo = UserDefaults.standard
                    photo.set(data, forKey:  url_photo)
                    photo.synchronize()
                }
                OperationQueue.main.addOperation {
                    table.reloadData()
                }
            }
        }
    }
    
}
