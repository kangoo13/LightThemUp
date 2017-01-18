//
//  CheckToken.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 16/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit
import Alamofire
import JASON

class CheckToken {
    
    var ctrl: UIViewController!
    
    init(ctrl: UIViewController) {
        self.ctrl = ctrl
    }
    
    func checkTokenInLogin() {
        let userdef = UserDefaults.standard
        
        guard let token: String = userdef.value(forKey: "token") as! String? else {
            return
        }
        
        guard let id: String = userdef.value(forKey: "user_id") as! String? else {
            return
        }
        
        let test = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZhdWNoZXVyQGZhdWNoZXVyLmZyIiwiaWQiOiI1ODFlNjcyODkwNDNlMzg4MGNhZDdlYzAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNDg0NTU3NDE1LCJleHAiOjE0ODQ2NDM4MTV9.ps9DD634xslbrT7fGFekWg_XOH52zq3morby6pKheek"
        
        let headers: HTTPHeaders = [
            "x-access-token": token
        ]
        
        
        print("id \(id)  token \(token)")
        
        Alamofire.request("http://lightthemup.fr.nf:3000/playlists/user", method: .get, headers: headers).responseJSON { response in
            
            if let json = response.result.value {
                
                let res = JSON(json)
                
                if (res["success"].boolValue) {
                    return
                }
                else {
                    print("good")
                    let storyboard = UIStoryboard(name: "Main", bundle: nil)
                    let controller = storyboard.instantiateViewController(withIdentifier: "home")
                    self.ctrl.present(controller, animated: true, completion: nil)
                    return
                }
            }
        }
    }
    
    func checkTokenInHome() {
        let userdef = UserDefaults.standard
        
        guard let token: String = userdef.value(forKey: "token") as! String? else {
            return
        }
        
        guard let id: String = userdef.value(forKey: "user_id") as! String? else {
            return
        }
        
        let test = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZhdWNoZXVyQGZhdWNoZXVyLmZyIiwiaWQiOiI1ODFlNjcyODkwNDNlMzg4MGNhZDdlYzAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNDg0NTU3NDE1LCJleHAiOjE0ODQ2NDM4MTV9.ps9DD634xslbrT7fGFekWg_XOH52zq3morby6pKheek"
        
        let headers: HTTPHeaders = [
            "x-access-token": token
        ]
        
        
        print("id \(id)  token \(token)")
        
        Alamofire.request("http://lightthemup.fr.nf:3000/playlists/user", method: .get, headers: headers).responseJSON { response in
            
            if let json = response.result.value {
                
                let res = JSON(json)
                
                guard let state = res["success"].bool else {
                    print("good")
                    return
                }
                
                if (state == false) {
                    let storyboard = UIStoryboard(name: "Main", bundle: nil)
                    let controller = storyboard.instantiateViewController(withIdentifier: "login")
                    self.ctrl.present(controller, animated: true, completion: nil)
                }
            }
        }
    }
}
