
import { Seo } from "@/components/Seo";
import { PostCard } from "@/components/PostCard";
import { PostCardSkeleton } from "@/components/PostCardSkeleton";
import { posts } from "@/data/posts";
import { authors } from "@/data/authors";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Users, BookOpen, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredPosts = posts.slice(0, 6);
  
  return (
    <>
      <Seo 
        title="Level One Radiology"
        description="Advanced radiology education and case studies for medical professionals. Explore comprehensive imaging cases, expert insights, and cutting-edge diagnostic techniques."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Level One Radiology",
          "description": "Advanced radiology education and case studies for medical professionals",
          "url": "https://leveloneradiology.com"
        }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/30">
                <Activity className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Advanced Radiology Education</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
              Level One
              <span className="block text-accent">Radiology</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Master complex imaging cases with expert-curated content, interactive DICOM viewers, 
              and comprehensive educational resources designed for radiology professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-black font-semibold px-8 py-3 rounded-full">
                <Link to="/cases">
                  Explore Cases
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 rounded-full">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-accent/10 rounded-full blur-xl animate-pulse"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 5}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">500+</h3>
              <p className="text-slate-600 dark:text-slate-400">Imaging Cases</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">10k+</h3>
              <p className="text-slate-600 dark:text-slate-400">Medical Professionals</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">50+</h3>
              <p className="text-slate-600 dark:text-slate-400">Subspecialties</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Featured Cases
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                Dive into carefully selected imaging cases that challenge and enhance your diagnostic skills.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/cases">
                View All Cases
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => {
              const author = authors.find(a => a.id === post.authorId);
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  author={author}
                />
              );
            })}
          </div>
          
          <div className="flex justify-center mt-12 sm:hidden">
            <Button asChild variant="outline">
              <Link to="/cases">
                View All Cases
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to Advance Your Radiology Skills?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of medical professionals who trust Level One Radiology for their continuing education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-black font-semibold">
              <Link to="/search">
                <Search className="mr-2 w-5 h-5" />
                Search Cases
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Learn About Our Approach</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
