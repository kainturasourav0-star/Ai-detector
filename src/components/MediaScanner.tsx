import { useState, useRef, useCallback } from "react";
import { Upload, Image, Video, Shield, Loader2, AlertTriangle, ShieldCheck, ShieldX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";

const MediaScanner = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/") && !f.type.startsWith("video/")) {
      setError("Please upload an image or video file.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("File must be under 10MB.");
      return;
    }
    setFile(f);
    setAnalysis(null);
    setError(null);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const analyzeMedia = async () => {
    if (!file) return;
    setLoading(true);
    setAnalysis(null);
    setError(null);

    try {
      // Convert to base64
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64 = btoa(binary);

      const { data, error: fnError } = await supabase.functions.invoke("analyze-media", {
        body: { imageBase64: base64, mimeType: file.type, fileName: file.name },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setAnalysis(data.analysis);
    } catch (err: any) {
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setAnalysis(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const isVideo = file?.type.startsWith("video/");

  return (
    <section id="media-scanner" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground">
              Media <span className="text-primary text-glow">Analyzer</span>
            </h2>
            <p className="text-muted-foreground">
              Upload an image or video to detect AI-generated content, deepfakes, and digital manipulation.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          {/* Upload zone */}
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`rounded-xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
                dragOver
                  ? "border-primary bg-primary/5 box-glow"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground mb-1">Drop your file here</p>
                  <p className="text-sm text-muted-foreground">or click to browse — Images & Videos up to 10MB</p>
                </div>
                <div className="flex gap-3 mt-2">
                  <span className="text-xs px-3 py-1 rounded-full border border-border bg-secondary/50 text-muted-foreground font-display flex items-center gap-1.5">
                    <Image className="w-3 h-3" /> JPG, PNG, WEBP
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full border border-border bg-secondary/50 text-muted-foreground font-display flex items-center gap-1.5">
                    <Video className="w-3 h-3" /> MP4, WEBM
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="aspect-video relative bg-background flex items-center justify-center">
                  {isVideo ? (
                    <video src={preview!} controls className="max-h-full max-w-full" />
                  ) : (
                    <img src={preview!} alt="Upload preview" className="max-h-full max-w-full object-contain" />
                  )}
                  {loading && (
                    <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-3">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-2 border-primary/30 animate-ping absolute inset-0" />
                        <div className="w-16 h-16 rounded-full border-2 border-t-primary animate-spin" />
                      </div>
                      <span className="text-sm font-display text-primary animate-pulse">Analyzing with AI...</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-secondary/20">
                  <div className="flex items-center gap-2">
                    {isVideo ? <Video className="w-4 h-4 text-muted-foreground" /> : <Image className="w-4 h-4 text-muted-foreground" />}
                    <span className="text-xs text-muted-foreground font-display truncate max-w-[200px]">{file.name}</span>
                    <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(0)} KB)</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={reset}
                      className="text-xs px-4 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors font-display"
                    >
                      Clear
                    </button>
                    <button
                      onClick={analyzeMedia}
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-5 py-1.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-xs disabled:opacity-40 hover:box-glow transition-shadow duration-300"
                    >
                      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Shield className="w-3.5 h-3.5" />}
                      {loading ? "Analyzing..." : "Scan for AI"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-danger/30 bg-danger/10 p-4 flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
              <p className="text-sm text-danger">{error}</p>
            </motion.div>
          )}

          {/* Results */}
          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  {analysis.toLowerCase().includes("ai-generated") || analysis.toLowerCase().includes("suspicious") ? (
                    <ShieldX className="w-5 h-5 text-danger" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-safe" />
                  )}
                  <h3 className="font-display font-bold text-foreground">AI Forensic Report</h3>
                </div>
                <div className="prose prose-sm prose-invert max-w-none text-secondary-foreground [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_strong]:text-foreground [&_li]:text-secondary-foreground">
                  <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MediaScanner;
