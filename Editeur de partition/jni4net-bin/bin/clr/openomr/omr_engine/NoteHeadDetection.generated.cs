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
    public partial class NoteHeadDetection : global::java.lang.Object {
        
        internal new static global::java.lang.Class staticClass;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_getYposBeforeFilter0;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_getXProjectionBeforeFilter1;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_generateGNUPlotFile2;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_XProjection3;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_getYPos4;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_getXProjection5;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_printXProj6;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_printYPos7;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n_findNotes8;
        
        internal static global::net.sf.jni4net.jni.MethodId j4n__ctorNoteHeadDetection9;
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(Ljava/awt/image/BufferedImage;Lopenomr/omr_engine/StaveParameters;)V")]
        public NoteHeadDetection(global::java.lang.Object par0, global::openomr.omr_engine.StaveParameters par1) : 
                base(((global::net.sf.jni4net.jni.JNIEnv)(null))) {
            global::net.sf.jni4net.jni.JNIEnv @__env = global::net.sf.jni4net.jni.JNIEnv.ThreadEnv;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 14)){
            @__env.NewObject(global::openomr.omr_engine.NoteHeadDetection.staticClass, global::openomr.omr_engine.NoteHeadDetection.j4n__ctorNoteHeadDetection9, this, global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par0), global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par1));
            }
        }
        
        protected NoteHeadDetection(global::net.sf.jni4net.jni.JNIEnv @__env) : 
                base(@__env) {
        }
        
        public static global::java.lang.Class _class {
            get {
                return global::openomr.omr_engine.NoteHeadDetection.staticClass;
            }
        }
        
        private static void InitJNI(global::net.sf.jni4net.jni.JNIEnv @__env, java.lang.Class @__class) {
            global::openomr.omr_engine.NoteHeadDetection.staticClass = @__class;
            global::openomr.omr_engine.NoteHeadDetection.j4n_getYposBeforeFilter0 = @__env.GetMethodID(global::openomr.omr_engine.NoteHeadDetection.staticClass, "getYposBeforeFilter", "()[I");
            global::openomr.omr_engine.NoteHeadDetection.j4n_getXProjectionBeforeFilter1 = @__env.GetMethodID(global::openomr.omr_engine.NoteHeadDetection.staticClass, "getXProjectionBeforeFilter", "()[I");
            global::openomr.omr_engine.NoteHeadDetection.j4n_generateGNUPlotFile2 = @__env.GetMethodID(global::openomr.omr_engine.NoteHeadDetection.staticClass, "generateGNUPlotFile", "(Ljava/lang/String;[II)V");
            global::openomr.omr_engine.NoteHeadDetection.j4n_XProjection3 = @__env.GetMethodID(global::openomr.omr_engine.NoteHeadDetection.staticClass, "XProjection", "(IIII)V");
            global::openomr.omr_engine.NoteHeadDetection.j4n_getYPos4 = @__env.GetMethodID(global::openomr.omr_engine.NoteHeadDetection.staticClass, "getYPos", "()[I");
            global::openomr.omr_engine.NoteHeadDetection.j4n_getXProjection5 = @__env.GetMethodID(global::openomr.omr_engine.NoteHeadDetection.staticClass, "getXProjection", "()[I");
            global::openomr.omr_engine.NoteHeadDetection.j4n_printXProj6 = @__env.GetMethodID(global::openomr.omr_engine.NoteHeadDetection.staticClass, "printXProj", "(I)V");
            global::openomr.omr_engine.NoteHeadDetection.j4n_printYPos7 = @__env.GetMethodID(global::openomr.omr_engine.NoteHeadDetection.staticClass, "printYPos", "(II)V");
            global::openomr.omr_engine.NoteHeadDetection.j4n_findNotes8 = @__env.GetMethodID(global::openomr.omr_engine.NoteHeadDetection.staticClass, "findNotes", "(IIII)Ljava/util/LinkedList;");
            global::openomr.omr_engine.NoteHeadDetection.j4n__ctorNoteHeadDetection9 = @__env.GetMethodID(global::openomr.omr_engine.NoteHeadDetection.staticClass, "<init>", "(Ljava/awt/image/BufferedImage;Lopenomr/omr_engine/StaveParameters;)V");
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("()[I")]
        public virtual int[] getYposBeforeFilter() {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 10)){
            return global::net.sf.jni4net.utils.Convertor.ArrayPrimJ2Cint(@__env, @__env.CallObjectMethodPtr(this, global::openomr.omr_engine.NoteHeadDetection.j4n_getYposBeforeFilter0));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("()[I")]
        public virtual int[] getXProjectionBeforeFilter() {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 10)){
            return global::net.sf.jni4net.utils.Convertor.ArrayPrimJ2Cint(@__env, @__env.CallObjectMethodPtr(this, global::openomr.omr_engine.NoteHeadDetection.j4n_getXProjectionBeforeFilter1));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(Ljava/lang/String;[II)V")]
        public virtual void generateGNUPlotFile(global::java.lang.String par0, int[] par1, int par2) {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 16)){
            @__env.CallVoidMethod(this, global::openomr.omr_engine.NoteHeadDetection.j4n_generateGNUPlotFile2, global::net.sf.jni4net.utils.Convertor.ParStrongCp2J(par0), global::net.sf.jni4net.utils.Convertor.ParArrayPrimC2J(@__env, par1), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par2));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(IIII)V")]
        public virtual void XProjection(int par0, int par1, int par2, int par3) {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 18)){
            @__env.CallVoidMethod(this, global::openomr.omr_engine.NoteHeadDetection.j4n_XProjection3, global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par0), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par1), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par2), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par3));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("()[I")]
        public virtual int[] getYPos() {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 10)){
            return global::net.sf.jni4net.utils.Convertor.ArrayPrimJ2Cint(@__env, @__env.CallObjectMethodPtr(this, global::openomr.omr_engine.NoteHeadDetection.j4n_getYPos4));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("()[I")]
        public virtual int[] getXProjection() {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 10)){
            return global::net.sf.jni4net.utils.Convertor.ArrayPrimJ2Cint(@__env, @__env.CallObjectMethodPtr(this, global::openomr.omr_engine.NoteHeadDetection.j4n_getXProjection5));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(I)V")]
        public virtual void printXProj(int par0) {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 12)){
            @__env.CallVoidMethod(this, global::openomr.omr_engine.NoteHeadDetection.j4n_printXProj6, global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par0));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(II)V")]
        public virtual void printYPos(int par0, int par1) {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 14)){
            @__env.CallVoidMethod(this, global::openomr.omr_engine.NoteHeadDetection.j4n_printYPos7, global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par0), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par1));
            }
        }
        
        [global::net.sf.jni4net.attributes.JavaMethodAttribute("(IIII)Ljava/util/LinkedList;")]
        public virtual global::java.lang.Object findNotes(int par0, int par1, int par2, int par3) {
            global::net.sf.jni4net.jni.JNIEnv @__env = this.Env;
            using(new global::net.sf.jni4net.jni.LocalFrame(@__env, 18)){
            return global::net.sf.jni4net.utils.Convertor.StrongJ2Cp<global::java.lang.Object>(@__env, @__env.CallObjectMethodPtr(this, global::openomr.omr_engine.NoteHeadDetection.j4n_findNotes8, global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par0), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par1), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par2), global::net.sf.jni4net.utils.Convertor.ParPrimC2J(par3)));
            }
        }
        
        new internal sealed class ContructionHelper : global::net.sf.jni4net.utils.IConstructionHelper {
            
            public global::net.sf.jni4net.jni.IJvmProxy CreateProxy(global::net.sf.jni4net.jni.JNIEnv @__env) {
                return new global::openomr.omr_engine.NoteHeadDetection(@__env);
            }
        }
    }
    #endregion
}