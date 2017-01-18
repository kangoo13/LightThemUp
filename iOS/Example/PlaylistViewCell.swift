//
//  PlaylistViewCell.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 14/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit

class PlaylistViewCell: UITableViewCell {
    
    //@IBOutlet weak var name: UILabel!
    //@IBOutlet weak var number: UILabel!
    @IBOutlet weak var name: UILabel!
    @IBOutlet weak var number: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }
    
    override func pressesChanged(_ presses: Set<UIPress>, with event: UIPressesEvent?) {
    }
    
}
