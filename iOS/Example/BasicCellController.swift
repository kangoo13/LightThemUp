//
//  BasicCell.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 17/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import Foundation
import UIKit

class BasicCellController: UITableViewCell {
    
    /*@IBOutlet weak var imageSong: UIImageView!
     @IBOutlet weak var titleSong: UILabel!
     @IBOutlet weak var artistSong: UILabel!*/
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        /* self.imageSong.layer.cornerRadius = 20
         self.imageSong.clipsToBounds = true*/
        // Initialization code
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }
    
}
