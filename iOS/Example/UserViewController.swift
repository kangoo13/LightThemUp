//
//  UserViewController.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 13/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit
import SideMenuController

class UserViewController: UITableViewController, SideMenuControllerDelegate {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = "User Info"
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 9/255, green: 211/255, blue: 171/255, alpha: 0.5)
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
