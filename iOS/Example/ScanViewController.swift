//
//  ContentViewController.swift
//  Example
//
//  Created by Teodor Patras on 16/06/16.
//  Copyright © 2016 teodorpatras. All rights reserved.
//

import UIKit
import SideMenuController
import ImagePicker

class ScanViewController: UIViewController, ImagePickerDelegate, SideMenuControllerDelegate {
    @IBOutlet weak var ImageView: UIImageView!
    
    @IBOutlet weak var btn_take: UIButton!
    @IBOutlet weak var btn_browse: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //TODO : trad
        self.title = "Scan"
        //self.title.color
        //self.navigationBar.tintColor = UIColor.white
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 9/255, green: 211/255, blue: 171/255, alpha: 0.5)
        sideMenuController?.delegate = self
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
    }
    
    func wrapperDidPress(_ imagePicker: ImagePickerController, images: [UIImage]) {
        print("lol")
    }
    
    func doneButtonDidPress(_ imagePicker: ImagePickerController, images: [UIImage]) {
        print("take")
        self.ImageView.image = images[0]
        imagePicker.dismiss(animated: true, completion: {
            print("dissmiss")
        })
    }
    func cancelButtonDidPress(_ imagePicker: ImagePickerController) {
    }
    
    @IBAction func takePicture(_ sender: Any) {
        let imagePickerController = ImagePickerController()
        imagePickerController.delegate = self
        
        present(imagePickerController, animated: true, completion: nil)
    }
   
    @IBAction func sendPicture(_ sender: Any) {
    }
       
    func sideMenuControllerDidHide(_ sideMenuController: SideMenuController) {
        print(#function)
    }
    
    func sideMenuControllerDidReveal(_ sideMenuController: SideMenuController) {
        print(#function)
    }
}
