//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by jni4net. See http://jni4net.sourceforge.net/ 
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace openomr.imageprocessing {
    
    
    #region Component Designer generated code 
    [global::net.sf.jni4net.attributes.JavaClassAttribute()]
    public partial class DoBlackandWhite : global::java.lang.Object {
        
        internal new static global::java.lang.Class staticClass;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_doBW0;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n__ctorDoBlackandWhite1;
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(Ljava/awt/image/BufferedImage;)V")]
        public DoBlackandWhite(global::java.lang.Object par0) : 
                base(((global::net.sf.jni4net.jni.JNIEnv)(null))) {
            global::net.sf.jni4net.jni.JNIEnv @__env = global::net.sf.jni4net.jni.JNIEnv.ThreadEnv;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 12)){
            @__env.NewObject(global::openomr.imageprocessing.DoBlackandWhite.staticClass, global::openomr.imageprocessing.DoBlackandWhite.j4n__ctorDoBlackandWhite1, this, global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par0));
            }
        }
        
        protected DoBlackandWhite(global::net.sf.jni4net.jni.JNIEnv @__env) : 
                base(@__env) {
        }
        
        public static global::java.lang.Class _class {
            get {
                return global::openomr.imageprocessing.DoBlackandWhite.staticClass;
            }
        }
        
        private static void InitJNI(global::net.sf.jni4net.jni.JNIEnv @__env, java.lang.Class @__class) {
            global::openomr.imageprocessing.DoBlackandWhite.staticClass = @__class;
            global::openomr.imageprocessing.DoBlackandWhite.j4n_doBW0 = @__env.GetMethodID(global::openomr.imageprocessing.DoBlackandWhite.staticClass, "doBW", "()V");
            global::openomr.imageprocessing.DoBlackandWhite.j4n__ctorDoBlackandWhite1 = @__env.GetMethodID(global::openomr.imageprocessing.DoBlackandWhite.staticClass, "<init>", "(Ljava/awt/image/BufferedImage;)V");
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("()V")]
        public virtual void doBW() {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 10)){
            @__env.CallVoidMethod(this, global::openomr.imageprocessing.DoBlackandWhite.j4n_doBW0);
            }
        }
        
        new internal sealed class ContructionHelper : global::net.sf.jni4net.utils.IConstructionHelper {
            
            public global::net.sf.jni4net.jni.IJvmProxy CreateProxy(global::net.sf.jni4net.jni.JNIEnv @__env) {
                return new global::openomr.imageprocessing.DoBlackandWhite(@__env);
            }
        }
    }
    #endregion
}