//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by jni4net. See http://jni4net.sourceforge.net/ 
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace openomr.gui {
    
    
    #region Component Designer generated code 
    [global::net.sf.jni4net.attributes.JavaClassAttribute()]
    public partial class DrawingTools : global::java.lang.Object {
        
        internal new static global::java.lang.Class staticClass;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_drawMeasures0;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_drawStave1;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_drawNote2;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_drawBox3;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n__ctorDrawingTools4;
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("()V")]
        public DrawingTools() : 
                base(((global::net.sf.jni4net.jni.JNIEnv)(null))) {
            global::net.sf.jni4net.jni.JNIEnv @__env = global::net.sf.jni4net.jni.JNIEnv.ThreadEnv;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 10)){
            @__env.NewObject(global::openomr.gui.DrawingTools.staticClass, global::openomr.gui.DrawingTools.j4n__ctorDrawingTools4, this);
            }
        }
        
        protected DrawingTools(global::net.sf.jni4net.jni.JNIEnv @__env) : 
                base(@__env) {
        }
        
        public static global::java.lang.Class _class {
            get {
                return global::openomr.gui.DrawingTools.staticClass;
            }
        }
        
        private static void InitJNI(global::net.sf.jni4net.jni.JNIEnv @__env, java.lang.Class @__class) {
            global::openomr.gui.DrawingTools.staticClass = @__class;
            global::openomr.gui.DrawingTools.j4n_drawMeasures0 = @__env.GetStaticMethodID(global::openomr.gui.DrawingTools.staticClass, "drawMeasures", "(Ljava/awt/image/BufferedImage;Lopenomr/omr_engine/Staves;)V");
            global::openomr.gui.DrawingTools.j4n_drawStave1 = @__env.GetStaticMethodID(global::openomr.gui.DrawingTools.staticClass, "drawStave", "(Ljava/awt/image/BufferedImage;IILopenomr/omr_engine/Staves;Ljava/awt/Color;)V");
            global::openomr.gui.DrawingTools.j4n_drawNote2 = @__env.GetStaticMethodID(global::openomr.gui.DrawingTools.staticClass, "drawNote", "(Ljava/awt/image/BufferedImage;IIII)V");
            global::openomr.gui.DrawingTools.j4n_drawBox3 = @__env.GetStaticMethodID(global::openomr.gui.DrawingTools.staticClass, "drawBox", "(Ljava/awt/image/BufferedImage;IIIILjava/awt/Color;)V");
            global::openomr.gui.DrawingTools.j4n__ctorDrawingTools4 = @__env.GetMethodID(global::openomr.gui.DrawingTools.staticClass, "<init>", "()V");
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(Ljava/awt/image/BufferedImage;Lopenomr/omr_engine/Staves;)V")]
        public static void drawMeasures(global::java.lang.Object par0, global::openomr.omr_engine.Staves par1) {
            global::net.sf.jni4net.jni.JNIEnv @__env = global::net.sf.jni4net.jni.JNIEnv.ThreadEnv;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 14)){
            @__env.CallStaticVoidMethod(global::openomr.gui.DrawingTools.staticClass, global::openomr.gui.DrawingTools.j4n_drawMeasures0, global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par0), global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par1));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(Ljava/awt/image/BufferedImage;IILopenomr/omr_engine/Staves;Ljava/awt/Color;)V")]
        public static void drawStave(global::java.lang.Object par0, int par1, int par2, global::openomr.omr_engine.Staves par3, global::java.lang.Object par4) {
            global::net.sf.jni4net.jni.JNIEnv @__env = global::net.sf.jni4net.jni.JNIEnv.ThreadEnv;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 20)){
            @__env.CallStaticVoidMethod(global::openomr.gui.DrawingTools.staticClass, global::openomr.gui.DrawingTools.j4n_drawStave1, global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par0), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par1), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par2), global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par3), global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par4));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(Ljava/awt/image/BufferedImage;IIII)V")]
        public static void drawNote(global::java.lang.Object par0, int par1, int par2, int par3, int par4) {
            global::net.sf.jni4net.jni.JNIEnv @__env = global::net.sf.jni4net.jni.JNIEnv.ThreadEnv;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 20)){
            @__env.CallStaticVoidMethod(global::openomr.gui.DrawingTools.staticClass, global::openomr.gui.DrawingTools.j4n_drawNote2, global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par0), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par1), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par2), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par3), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par4));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(Ljava/awt/image/BufferedImage;IIIILjava/awt/Color;)V")]
        public static void drawBox(global::java.lang.Object par0, int par1, int par2, int par3, int par4, global::java.lang.Object par5) {
            global::net.sf.jni4net.jni.JNIEnv @__env = global::net.sf.jni4net.jni.JNIEnv.ThreadEnv;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 22)){
            @__env.CallStaticVoidMethod(global::openomr.gui.DrawingTools.staticClass, global::openomr.gui.DrawingTools.j4n_drawBox3, global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par0), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par1), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par2), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par3), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par4), global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par5));
            }
        }
        
        new internal sealed class ContructionHelper : global::net.sf.jni4net.utils.IConstructionHelper {
            
            public global::net.sf.jni4net.jni.IJvmProxy CreateProxy(global::net.sf.jni4net.jni.JNIEnv @__env) {
                return new global::openomr.gui.DrawingTools(@__env);
            }
        }
    }
    #endregion
}
