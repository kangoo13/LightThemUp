/***************************************************************************
 *   Copyright (C) 2006 by Arnaud Desaedeleer                              *
 *   arnaud@desaedeleer.com                                                *
 *                                                                         *
 *   This file is part of OpenOMR                                          *                                                      
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
 ***************************************************************************/


package openomr.openomr;

import java.util.List;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.LinkedList;
import javax.imageio.ImageIO;
import javax.sound.midi.InvalidMidiDataException;
import javax.sound.midi.MidiEvent;
import javax.sound.midi.MidiUnavailableException;
import javax.sound.midi.Track;
import openomr.ann.ANNInterrogator;
import openomr.fft.FFT;
import openomr.imageprocessing.RotateImage;
import openomr.midi.ScoreGenerator;
import openomr.omr_engine.DetectionProcessor;
import openomr.omr_engine.StaveDetection;
import openomr.omr_engine.StaveParameters;
import openomr.omr_engine.Staves;
import openomr.omr_engine.YProjection;
import org.joone.net.NeuralNet;

public class SheetMusic
{
    private static FFT fft;
    private static BufferedImage buffImage;
    private static NeuralNet neuralNetwork;
    private static ScoreGenerator scoreGenerator;
    private static ANNInterrogator neuralNetInterrogator;

    public static void main(String av[])
	{
            int ac = av.length;
            if (ac == 0)
                System.out.println("Please provide a file. HELP: *.jar path_to_image name_of_output.");
            else if (ac > 2)
                System.out.println("Too many argument. HELP: *.jar path_to_image name_of_output.");
            else if (ac == 1) {
                convertImage(av[0]);
                saveFile("scanned_partition.mid");
            }
            else if (ac == 2) {
                convertImage(av[0]);
                saveFile(av[1]);
            }
            System.exit(0);
	}
    
    public static byte[] convertImage(String filename)
        {
            neuralNetInterrogator = new ANNInterrogator();
            try
            {
                buffImage = ImageIO.read(new File(filename));
                doFFT();
                
                YProjection yproj = new YProjection(buffImage);
                yproj.calcYProjection(0, buffImage.getHeight(), 0, buffImage.getWidth());

                StaveParameters staveParameters = new StaveParameters(buffImage);
                staveParameters.calcParameters();
                                
                StaveDetection staveDetection = new StaveDetection(yproj, staveParameters);
                staveDetection.setParameters(0.75, 0.75);
                staveDetection.locateStaves();
                if (staveDetection.getNumStavesFound() > 0)
                {
                    //calculate distance between notes
                    staveDetection.calcNoteDistance();

                    DetectionProcessor detection = new DetectionProcessor(buffImage, staveDetection, neuralNetwork);
                    detection.processAll();
                    
                    LinkedList<Staves> staveList = staveDetection.getStaveList();
                    try
                    {
                        scoreGenerator = new ScoreGenerator(staveList);
                        scoreGenerator.makeSong(64);
                        return (sequenceToString());
                        // List<Integer> messageList = new ArrayList<Integer>();
                        // Track track = scoreGenerator.getSequencer().getSequence().getTracks()[0];
                        // for (int i = 0; i < track.size(); i++)
                        // {
                        //    MidiEvent event = track.get(i);
                        //    ByteBuffer wrapper = ByteBuffer.wrap(event.getMessage().getMessage());
                        //    messageList.add(new Integer(wrapper.getShort()));
                        // }
                        // return (messageList);
                    }
                    catch (MidiUnavailableException | InvalidMidiDataException e) 
                    {
                        e.printStackTrace();                        
                    }
                }
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
            return null;
        }
    
    public static void saveFile(String filename)
        {
            if (scoreGenerator != null && scoreGenerator.getSequencer() != null)
            {
                File file = new File(filename);
                scoreGenerator.writeFile(file);            
            }
        }
    
    public static byte[] sequenceToString()
        {
            if (scoreGenerator != null && scoreGenerator.getSequencer() != null)
            {
                return scoreGenerator.writeToString();
            }
            return null;
        }
    public static void playFile()
        {
            if (scoreGenerator != null && scoreGenerator.getSequencer() != null)
            {
                scoreGenerator.start();
            }
        }
    
    public static void doFFT()
        {
            fft = new FFT(buffImage, 512);
            fft.doFFT();
            double rotAngle = fft.getRotationAngle();
            // System.out.println("Rot angle: " + (rotAngle * 180 / 3.14));

            if (rotAngle != 0)
            {
                RotateImage rotImage = new RotateImage(buffImage, rotAngle);
                buffImage = rotImage.tilt();
            }
        }

    
    public static void saveImage(BufferedImage buffImage, String name) throws IOException
	{
		File outFFT = new File(name + ".png");
		ImageIO.write(buffImage, "png", outFFT);
	}
    
    public static ANNInterrogator getANNInterrogator()
	{
		return neuralNetInterrogator;
	}
	
    public void setANNInterrogator(ANNInterrogator neuralNetInterrogator)
	{
		SheetMusic.neuralNetInterrogator = neuralNetInterrogator;
	}
}
