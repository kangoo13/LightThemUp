//
//  AchievmentTableViewCell.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 14/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit

class AchievmentTableViewCell: UITableViewCell {
    
    /*@IBOutlet weak var imageAchiev: UIImageView!
    @IBOutlet weak var titleAchiev: UILabel!
    @IBOutlet weak var descripAchiev: UILabel!*/
    @IBOutlet weak var imageAchiev: UIImageView!
    @IBOutlet weak var titleAchiev: UILabel!
    @IBOutlet weak var descripAchiev: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        self.imageAchiev.layer.cornerRadius = 20
        self.imageAchiev.clipsToBounds = true
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }
    
}
