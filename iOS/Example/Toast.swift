//
//  Toast.swift
//  Keylite
//
//  Created by Jérémy Kerbidi on 07/07/2016.
//  Copyright © 2016 Jérémy Kerbidi. All rights reserved.
//

import Foundation
import UIKit

class Toast {
    
    var view: UIView!
    var msg: String!
    
    init?(view: UIView, msg: String){
        self.view = view
        self.msg = msg
    }
    
    internal func Show(){
        let toastLabel = UILabel(frame: CGRect(x: self.view.frame.size.width/2 - 150, y: self.view.frame.size.height-100, width: 300, height: 35))
        
        
        toastLabel.backgroundColor = UIColor.black
        toastLabel.textColor = UIColor.white
        toastLabel.textAlignment = NSTextAlignment.center;
        self.view.addSubview(toastLabel)
        toastLabel.text = self.msg
        toastLabel.alpha = 1.0
        toastLabel.layer.cornerRadius = 10;
        toastLabel.clipsToBounds  =  true
        UIView.animate(withDuration: 4.0, delay: 0.1, options: .curveEaseOut, animations: {
            
            toastLabel.alpha = 0.0
            
            }, completion: nil)
        

    }
    
    internal func Achiev(){
        let toastLabel = UILabel(frame: CGRect(x: self.view.frame.size.width/2 - 150, y: self.view.frame.size.height-100, width: 300, height: 35))
        
        
        toastLabel.backgroundColor = UIColor.cyan
        toastLabel.textColor = UIColor.white
        toastLabel.textAlignment = NSTextAlignment.center;
        self.view.addSubview(toastLabel)
        toastLabel.text = self.msg
        toastLabel.alpha = 1.0
        toastLabel.layer.cornerRadius = 10;
        toastLabel.clipsToBounds  =  true
        UIView.animate(withDuration: 4.0, delay: 0.1, options: .curveEaseOut, animations: {
            
            toastLabel.alpha = 0.0
            
            }, completion: nil)
        

    }
}
