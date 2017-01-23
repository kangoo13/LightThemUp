//
//  Peripheral.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 13/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import Foundation
import CoreBluetooth

class Peripheral: NSObject, CBPeripheralDelegate {
    open var Name: String!
    var UUID: String!
    var RSSI: NSNumber!
    var Peripheral: CBPeripheral!
    
    init?(Name: String, UUID: String, RSSI: NSNumber, peripheral: CBPeripheral) {
        self.Name = Name
        self.UUID = UUID
        self.RSSI = RSSI
        self.Peripheral = peripheral
    }
}
