//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by jni4net. See http://jni4net.sourceforge.net/ 
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace openomr.omr_engine {
    
    
    #region Component Designer generated code 
    [global::net.sf.jni4net.attributes.JavaClassAttribute()]
    public partial class XProjection : global::java.lang.Object {
        
        internal new static global::java.lang.Class staticClass;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_getXProjection0;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_calcXProjection1;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_printXProjection2;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n__ctorXProjection3;
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(Ljava/awt/image/BufferedImage;)V")]
        public XProjection(global::java.lang.Object par0) : 
                base(((global::net.sf.jni4net.jni.JNIEnv)(null))) {
            global::net.sf.jni4net.jni.JNIEnv @__env = global::net.sf.jni4net.jni.JNIEnv.ThreadEnv;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 12)){
            @__env.NewObject(global::openomr.omr_engine.XProjection.staticClass, global::openomr.omr_engine.XProjection.j4n__ctorXProjection3, this, global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par0));
            }
        }
        
        protected XProjection(global::net.sf.jni4net.jni.JNIEnv @__env) : 
                base(@__env) {
        }
        
        public static global::java.lang.Class _class {
            get {
                return global::openomr.omr_engine.XProjection.staticClass;
            }
        }
        
        private static void InitJNI(global::net.sf.jni4net.jni.JNIEnv @__env, java.lang.Class @__class) {
            global::openomr.omr_engine.XProjection.staticClass = @__class;
            global::openomr.omr_engine.XProjection.j4n_getXProjection0 = @__env.GetMethodID(global::openomr.omr_engine.XProjection.staticClass, "getXProjection", "()[I");
            global::openomr.omr_engine.XProjection.j4n_calcXProjection1 = @__env.GetMethodID(global::openomr.omr_engine.XProjection.staticClass, "calcXProjection", "(IIII)V");
            global::openomr.omr_engine.XProjection.j4n_printXProjection2 = @__env.GetMethodID(global::openomr.omr_engine.XProjection.staticClass, "printXProjection", "()V");
            global::openomr.omr_engine.XProjection.j4n__ctorXProjection3 = @__env.GetMethodID(global::openomr.omr_engine.XProjection.staticClass, "<init>", "(Ljava/awt/image/BufferedImage;)V");
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("()[I")]
        public virtual int[] getXProjection() {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 10)){
            return global::net.sf.jni4net.utils.Convertor.ArrayPrimJ2Cint(@__env, @__env.CallObjectMethodPtr(this, global::openomr.omr_engine.XProjection.j4n_getXProjection0));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(IIII)V")]
        public virtual void calcXProjection(int par0, int par1, int par2, int par3) {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 18)){
            @__env.CallVoidMethod(this, global::openomr.omr_engine.XProjection.j4n_calcXProjection1, global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par0), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par1), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par2), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par3));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("()V")]
        public virtual void printXProjection() {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 10)){
            @__env.CallVoidMethod(this, global::openomr.omr_engine.XProjection.j4n_printXProjection2);
            }
        }
        
        new internal sealed class ContructionHelper : global::net.sf.jni4net.utils.IConstructionHelper {
            
            public global::net.sf.jni4net.jni.IJvmProxy CreateProxy(global::net.sf.jni4net.jni.JNIEnv @__env) {
                return new global::openomr.omr_engine.XProjection(@__env);
            }
        }
    }
    #endregion
}
