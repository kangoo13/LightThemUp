//
//  Playlist.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 14/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit

class Playlist {
    var name: String
    var number: String
    var update: String
    var created: String
    //var id: String
    
    init?(name: String, number: String, update: String, created: String) {
        self.name = name
        self.number = number
        self.update = update
        self.created = created
        //self.id = id
        
        if self.name.isEmpty {
            self.name = ""
        }
        
    }
}
