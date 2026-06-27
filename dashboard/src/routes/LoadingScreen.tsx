const LoadingScreen  = () => {
  return (
    <div> <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-success-muted/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex flex-col items-center space-y-8">
        {/* Logo animation */}
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-success-muted to-success-muted/60 rounded-2xl rotate-45 animate-logo-spin flex items-center justify-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl rotate-45"></div>
          </div>
          
          {/* Orbiting circles */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-success-muted/30 rounded-full animate-orbit"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-success-muted/20 rounded-full animate-orbit delay-500"></div>
        </div>

        {/* Loading text with gradient */}
        <div className="text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-success-muted to-white text-2xl font-bold animate-gradient-x">
            Loading...
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-success-muted to-white animate-progress-bar"></div>
        </div>
      </div>
    </div> </div>
  )
}

export default LoadingScreen 