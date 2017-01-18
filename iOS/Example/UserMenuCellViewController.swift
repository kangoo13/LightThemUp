//
//  UserMenuCellController.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 13/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit
import Alamofire
import JASON

class UserMenuCellViewController: UITableViewCell {
    
    @IBOutlet weak var avatar: UIImageView!
    @IBOutlet weak var name: UILabel!
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        self.avatar.layer.cornerRadius = 30
        self.avatar.clipsToBounds = true
        
        self.loadUserInfo()
    }
    
    private func loadUserInfo() {
        
        let userdef = UserDefaults.standard
        
        guard let token: String = userdef.value(forKey: "token") as! String? else {
            return
        }
        
        guard let id: String = userdef.value(forKey: "user_id") as! String? else {
            return
        }
        
        let headers: HTTPHeaders = [
            "x-access-token": token
        ]
        
        Alamofire.request("http://lightthemup.fr.nf:3000/users/"+id, method: .get, headers: headers).responseJSON { response in
            
            if let json = response.result.value {
                
                let response = JSON(json)
                
                self.name.text = response["name"].stringValue
                let url_pic = response["picture"].stringValue
                
                
                 let UserPhoto = UserDefaults.standard
                 
                 if let photo = UserPhoto.value(forKey: "picture") {
                    self.avatar.image = UIImage(data: photo as! Data)
                 }
                 else {
                 
                    Alamofire.request("http://lightthemup.fr.nf:3000/"+url_pic).responseData { response in
                        //response.result.value
                        if let data = response.result.value {
                 
                            self.avatar.image = UIImage(data: data)
                            
                            let User = UserDefaults.standard
                 
                            User.set(data, forKey: "picture")
                            User.synchronize()
                        }
                    }
                 }
            }
        }
    }
}
