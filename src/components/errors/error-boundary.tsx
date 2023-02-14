import React from "react";


export class ErrorBoundary extends React.Component <any, any>{
    constructor(props: any) {
      super(props);
      this.state = { hasError: false, error: '' };
    }
  
    static getDerivedStateFromError(error: any) {
      return { hasError: true, error: error };
    }
  
    componentDidCatch(error: any, errorInfo: any) {
      console.error(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
        <>
          <h1>Something went wrong.</h1>;
          <span> error: {this.state.error}</span>
        </>
        );
      }
  
      return this.props.children; 
    }
  }