//
//  ShopItemTableViewCell.swift
//  LightThemUp
//
//  Created by Jérémy Kerbidi on 14/01/2017.
//  Copyright © 2017 teodorpatras. All rights reserved.
//

import UIKit
import Alamofire
import JASON

class ShopItemTableViewCell: UITableViewCell {
    
    /*@IBOutlet weak var btnPlay: UIButton!
    @IBOutlet weak var imageSong: UIImageView!
    @IBOutlet weak var titleSong: UILabel!
    @IBOutlet weak var artistSong: UILabel!
    @IBOutlet weak var downloadSong: UILabel!
    @IBOutlet weak var priceSong: UILabel!*/
    @IBOutlet weak var btnPlay: UIButton!
    @IBOutlet weak var imageSong: UIImageView!
    @IBOutlet weak var titleSong: UILabel!
    @IBOutlet weak var artistSong: UILabel!
    @IBOutlet weak var priceSong: UILabel!
    
    
    @IBOutlet weak var addToCart: UIButton!
    var title: String!
    var artist: String!
    var price: Float!
    var photo: UIImage!
    var previewUrl:String!
    var fileUrl:String!
    var idSong: String!
    var status: Bool = false
    var Token: String!
    
    var success: Int!
    //var sound:MidiSound!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        self.imageSong.layer.cornerRadius = 20
        self.imageSong.clipsToBounds = true
        
        self.btnPlay.layer.zPosition = 1
        let preferences = UserDefaults.standard
        
        if (preferences.object(forKey: "token") != nil){
            self.Token = preferences.object(forKey: "token") as! String
        }
        else {
            self.Token = ""
        }
    }
    
    @IBAction func LaunchSong(_ sender: AnyObject) {
        
        if (!status){
            btnPlay.setImage(UIImage(named: "media_pause"), for: UIControlState())
            //self.sound = MidiSound(Url: "Movie Themes.mid")
            print(self.title)
            //self.sound.play()
            
            status = true
        }else{
            btnPlay.setImage(UIImage(named: "media_play"), for: UIControlState())
            
            //self.sound.stopPlaying()
            status = false
        }
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }
    
    private func buySong() {
        
        
        
        let parameters: Parameters = [
            "idSong" : self.idSong,
            ]
        
        let headers: HTTPHeaders = [
            "x-access-token": self.Token
        ]
        
        Alamofire.request("http://lightthemup.fr.nf:3000/users/songs", method: .post, parameters: parameters, headers: headers).responseJSON { response in
            
            if let json = response.result.value {
                let res = JSON(json)
                
               // guard let success = res["success"].int else { return }
                guard let message = res["message"].string else { return }
                
                let toast = Toast(view: self.superview!, msg: message)
                toast!.Show()
            }
        }
    }
    
    @IBAction func AddToCart(_ sender: AnyObject) {
        self.buySong()
    }
}
