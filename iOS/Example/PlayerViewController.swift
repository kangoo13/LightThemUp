//
//  PlayerViewController.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 17/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit

class PlayerViewController: UIViewController {
    
    var detailItem: Song? {
        didSet {
            // Update the view.
            self.configureView()
        }
    }
    
    func configureView() {
        // Update the user interface for the detail item.
        if let song = self.detailItem {
            print("ok \(song.title)  \(song.artist)  \(song.photo)")
        }
    }
    
    @IBAction func back(_ sender: Any) {
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.title = self.detailItem?.title
        self.navigationController?.navigationBar.barTintColor = UIColor(red: 9/255, green: 211/255, blue: 171/255, alpha:  0.5)

        self.configureView()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

