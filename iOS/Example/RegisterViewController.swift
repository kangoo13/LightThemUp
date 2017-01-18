//
//  RegisterViewController.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 13/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit
import SideMenuController
import Alamofire
import JASON

class RegisterViewController: UIViewController {
    
    @IBOutlet weak var name: UITextField!
    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    @IBOutlet weak var repassword: UITextField!
    @IBOutlet weak var btn_register: UIButton!
    @IBOutlet weak var passInfo: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 9/255, green: 211/255, blue: 171/255, alpha: 0.5)
        self.btn_register.layer.cornerRadius = 5
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(self.dismissKeyboard))
        view.addGestureRecognizer(tap)
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        if textField == self.name {
            self.email.becomeFirstResponder()
        }
        else if textField == self.email {
            self.password.becomeFirstResponder()
        }
        else if textField == self.password {
            self.repassword.becomeFirstResponder()
        }
        else {
            let mail: String = self.email.text!
            let pass: String = self.password.text!
            self.connection(mail: mail, pass: pass)
            //self.performSegue(withIdentifier: "RegisterSeg", sender: nil)
            //self.RegisterAction(BtnRegister)
        }
        return true
    }
    
    @objc private func dismissKeyboard() {
        view.endEditing(true)
    }
    
    private func connection(mail: String, pass: String) {
        
        let email = mail
        let password = pass
        
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
                    let storyboard = UIStoryboard(name: "Main", bundle: nil)
                    let controller = storyboard.instantiateViewController(withIdentifier: "home")
                    self.present(controller, animated: true, completion: nil)
                   // self.performSegue(withIdentifier: "RegisterSeg", sender: nil)
                }
                else {
                    let toast = Toast(view: self.view, msg: message)
                    toast?.Show()
                }
            }
        }
    }
    
    private func requestAPI() {
        
        view.endEditing(true)
        var name: String = self.name.text!
        let email: String = self.email.text!
        let password: String = self.password.text!
        
        if (name.isEmpty == true) {
            name = ""
        }
        
        
        
        let parameters: Parameters = [
            "name" : name,
            "email" : email,
            "password" : password
        ]
        
        Alamofire.request("http://lightthemup.fr.nf:3000/users", method: .post, parameters: parameters).responseJSON { response in
            
            print("res : \(response)")
            if (response.result.isSuccess) {
                self.removeAllOverlays()
                self.connection(mail: email, pass: password)
            }
            
            if (response.result.isFailure) {
                self.removeAllOverlays()
            }
            
            if let json = response.result.value {
                
                let data = JSON(json)
                
                guard let success = data["success"].int else { return }
                
                if (success == 1) {
                    
                    guard let token = data["token"].string else { return }
                    guard let id = data["id"].string else { return }
                    
                    let user = UserDefaults.standard
                    user.set(token, forKey: "token")
                    user.set(self.email, forKey: "email")
                    user.set(id, forKey: "user_id")
                    user.set(1, forKey: "ISLOGGEDIN")
                    user.synchronize()
                    self.removeAllOverlays()
                }
                else {
                    guard let error = data["message"].string else { return }
                    let toast = Toast(view: self.view, msg: error)
                    toast!.Show()
                }
            }
            else {
                let toast = Toast(view: self.view, msg: "Can't reach server.")
                toast!.Show()
            }
        }
    }
    
    private func isValidEmail(testStr:String) -> Bool {
        let emailRegEx = "^(?:(?:(?:(?: )*(?:(?:(?:\\t| )*\\r\\n)?(?:\\t| )+))+(?: )*)|(?: )+)?(?:(?:(?:[-A-Za-z0-9!#$%&’*+/=?^_'{|}~]+(?:\\.[-A-Za-z0-9!#$%&’*+/=?^_'{|}~]+)*)|(?:\"(?:(?:(?:(?: )*(?:(?:[!#-Z^-~]|\\[|\\])|(?:\\\\(?:\\t|[ -~]))))+(?: )*)|(?: )+)\"))(?:@)(?:(?:(?:[A-Za-z0-9](?:[-A-Za-z0-9]{0,61}[A-Za-z0-9])?)(?:\\.[A-Za-z0-9](?:[-A-Za-z0-9]{0,61}[A-Za-z0-9])?)*)|(?:\\[(?:(?:(?:(?:(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5]))\\.){3}(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5]))))|(?:(?:(?: )*[!-Z^-~])*(?: )*)|(?:[Vv][0-9A-Fa-f]+\\.[-A-Za-z0-9._~!$&'()*+,;=:]+))\\])))(?:(?:(?:(?: )*(?:(?:(?:\\t| )*\\r\\n)?(?:\\t| )+))+(?: )*)|(?: )+)?$"
        let emailTest = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        let result = emailTest.evaluate(with: testStr)
        return result
    }
    
    private func checkInfo() -> Bool {
        
        if (self.isValidEmail(testStr: self.email.text!)) {
            return true
        }
        else {
            let toast = Toast(view: self.view, msg: "Invalide Email")
            toast?.Show()
        }
        
        if (self.password.text == self.password.text) {
            return true
        }
        else {
            let toast = Toast(view: self.view, msg: "No matching password")
            toast?.Show()
        }
        
        return false
    }
    
    private func checkForm() {
        
        self.showWaitOverlayWithText("Loading")

        if self.email.text?.isEmpty != true {
            if self.password.text?.isEmpty != true {
                if self.repassword.text?.isEmpty != true {
                    if (self.checkInfo()) {
                        self.requestAPI()
                    }
                }
                else {
                    let toast = Toast(view: self.view, msg: "You need to retype your password")
                    toast?.Show()
                }
            }
            else {
                let toast = Toast(view: self.view, msg: "Password field is empty")
                toast?.Show()
            }
        }
        else {
            let toast = Toast(view: self.view, msg: "Email field is empty")
            toast?.Show()
        }
    }
    
    @IBAction func cancelAction(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func register(_ sender: Any) {
        print("register")
        
        self.checkForm()
    }
    
}
