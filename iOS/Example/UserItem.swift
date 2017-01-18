//
//  UserItem.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 13/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit
import Alamofire
import JASON

class UserItem {
    
    var name: String!
    var url_pic: String!
    var avatar: UIImage!
    
    init(name: String, url: String) {
        self.name = name
        self.url_pic = url
        
        self.loadUserInfo()
    }
    
    private func loadUserInfo() {
        
        //let url_pic = response["picture"].stringValue
        
        let UserPhoto = UserDefaults.standard
        
        if let photo = UserPhoto.value(forKey: "picture") {
            self.avatar = UIImage(data: photo as! Data)
        }
        else {
            Alamofire.request("http://lightthemup.fr.nf:3000/"+self.url_pic).responseData { response in
                        //response.result.value
                if let data = response.result.value {
                            
                    self.avatar = UIImage(data: data)
                            
                    let User = UserDefaults.standard
                    User.set(data, forKey: "picture")
                    User.synchronize()
                }
            }
        }
    }
}
