//
//  Singleton.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 17/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import Foundation
import CoreBluetooth

public class Singleton {
    
    //MARK: Shared Instance
    
    static let sharedInstance = Singleton()
   /* static let sharedInstance : Singleton = {

        let instance = Singleton(connected: "")
        
        return instance
    }()*/
    
    //MARK: Local Variable
    var connectedDevice: CBPeripheral!
    
    //MARK: Init
    private init() {
        return
    }
}
