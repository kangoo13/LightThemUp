//
//  RootViewController.swift
//  Example
//
//  Created by Teodor Patras on 20/06/16.
//  Copyright © 2016 teodorpatras. All rights reserved.
//

import UIKit
import SideMenuController
import SwiftOverlays
import Alamofire
import JASON

class LoginViewController: UIViewController, UITextFieldDelegate {
    
    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    @IBOutlet weak var btn_login: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.btn_login.layer.cornerRadius = 5
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(self.dismissKeyboard))
        view.addGestureRecognizer(tap)
        let userdef = UserDefaults.standard
        if let email: String = userdef.value(forKey: "email") as! String? {
            self.email.text = email
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        let check = CheckToken(ctrl: self)
        check.checkTokenInLogin()
        //self.checkToken()
    }
    
    /*private func checkToken() {
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
            
            if response.result.isSuccess {
                let storyboard = UIStoryboard(name: "Main", bundle: nil)
                let controller = storyboard.instantiateViewController(withIdentifier: "home")
                self.present(controller, animated: true, completion: nil)
            }
        }
    }*/
    
    private func isValidEmail(testStr:String) -> Bool {
        let emailRegEx = "^(?:(?:(?:(?: )*(?:(?:(?:\\t| )*\\r\\n)?(?:\\t| )+))+(?: )*)|(?: )+)?(?:(?:(?:[-A-Za-z0-9!#$%&’*+/=?^_'{|}~]+(?:\\.[-A-Za-z0-9!#$%&’*+/=?^_'{|}~]+)*)|(?:\"(?:(?:(?:(?: )*(?:(?:[!#-Z^-~]|\\[|\\])|(?:\\\\(?:\\t|[ -~]))))+(?: )*)|(?: )+)\"))(?:@)(?:(?:(?:[A-Za-z0-9](?:[-A-Za-z0-9]{0,61}[A-Za-z0-9])?)(?:\\.[A-Za-z0-9](?:[-A-Za-z0-9]{0,61}[A-Za-z0-9])?)*)|(?:\\[(?:(?:(?:(?:(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5]))\\.){3}(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5]))))|(?:(?:(?: )*[!-Z^-~])*(?: )*)|(?:[Vv][0-9A-Fa-f]+\\.[-A-Za-z0-9._~!$&'()*+,;=:]+))\\])))(?:(?:(?:(?: )*(?:(?:(?:\\t| )*\\r\\n)?(?:\\t| )+))+(?: )*)|(?: )+)?$"
        let emailTest = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        let result = emailTest.evaluate(with: testStr)
        return result
    }
    
    @objc private func dismissKeyboard() {
        view.endEditing(true)
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        
        if textField == self.email {
            self.password.becomeFirstResponder()
        }
        else {
            self.checkForm()
        }
    return true
    }
    
    private func checkForm() {
        
        self.showWaitOverlayWithText("Loading")

        //TODO: Trad
        if (self.email.text?.isEmpty != true) {
            if (self.password.text?.isEmpty != true) {
                if (self.isValidEmail(testStr: self.email.text!)){
                    self.requestAPI()
                }
                else {
                     self.removeAllOverlays()
                    let toast = Toast(view: self.view, msg: "Email invalide format")
                    toast?.Show()
                }
            }
            else {
                 self.removeAllOverlays()
                let toast = Toast(view: self.view, msg: "Password field is empty")
                toast?.Show()
            }
        }
        else {
             self.removeAllOverlays()
            let toast = Toast(view: self.view, msg: "Email field is empty")
            toast?.Show()
        }
    }
    
    private func requestAPI() {
        
        view.endEditing(true)
        let email = self.email.text ?? ""
        let password = self.password.text ?? ""
        
        let parameters: Parameters = [
            "email" : email,
            "password" : password
        ]
        
        Alamofire.request("http://lightthemup.fr.nf:3000/users/authenticate", method: .post, parameters: parameters).responseJSON { response in
            
            if (response.result.isSuccess) {
                self.removeAllOverlays()
                self.password.text = ""
            }
            
            if (response.result.isFailure) {
                self.removeAllOverlays()
                let toast = Toast(view: self.view, msg: "Can't reach server.")
                toast!.Show()
                // toast
            }
            
            if let json = response.result.value {
                
                let all = JSON(json)
                
                let success = all["success"].boolValue
                let message = all["message"].stringValue
                
                if (success) {
                    guard let token = all["token"].string else { return }
                    guard let id = all["id"].string else { return }

                    let user = UserDefaults.standard
                    user.set(token, forKey: "token")
                    user.set(email, forKey: "email")
                    user.set(id, forKey: "user_id")
                    user.set(1, forKey: "ISLOGGEDIN")
                    user.synchronize()
                    self.performSegue(withIdentifier: "LoginSeg", sender: nil)
                }
                else {
                    let toast = Toast(view: self.view, msg: message)
                    toast?.Show()
                }
            }
        }
    }
    
    @IBAction func connection(_ sender: Any) {
        
        self.checkForm()
    }
    
}
