
import { Seo } from "@/components/Seo";
import { PostCard } from "@/components/PostCard";
import { useAllPosts } from "@/hooks/useAsyncPosts";
import { authors } from "@/data/authors";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Users, BookOpen, Search } from "lucide-react";
import { Link } from "react-router-dom";
import React from 'react';

const Index = () => {
  const { posts, loading } = useAllPosts();
  const featuredPosts = posts.slice(0, 6);
  
  return (
    <div>
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
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`
          }}
        ></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/30">
                <Activity className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Advanced Radiology Education</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
              Level One
              <span className="block text-accent">Radiology</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
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
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">500+</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Imaging Cases</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">10k+</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Medical Professionals</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">50+</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Subspecialties</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 md:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
                Featured Cases
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl">
                Dive into carefully selected imaging cases that challenge and enhance your diagnostic skills.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex shrink-0">
              <Link to="/cases">
                View All Cases
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {loading ? (
              // Show loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))
            ) : (
              featuredPosts.map((post) => {
                const author = authors.find(a => a.id === post.authorId);
                return (
                  <PostCard
                    key={post.id}
                    post={{
                      id: post.id,
                      slug: post.slug,
                      title: post.title,
                      description: post.description,
                      category: post.category,
                      tags: post.tags,
                      date: post.date,
                      authorId: post.authorId,
                      content: post.content,
                      readTime: post.readTime || '5 min',
                      outline: post.outline,
                      thumbnailUrl: post.thumbnailUrl,
                      micrographics: post.micrographics || {
                        topLeft: '',
                        topRight: '',
                        bottomLeft: '',
                      },
                    }}
                    author={author}
                  />
                );
              })
            )}
          </div>
          
          <div className="flex justify-center mt-8 md:mt-12 sm:hidden">
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
      <section className="py-12 sm:py-16 lg:py-20 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
            Ready to Advance Your Radiology Skills?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
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
    </div>
  );
};

export default Index;
