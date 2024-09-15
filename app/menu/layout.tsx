export default function Menu({
    children,
}: {
    children: React.ReactNode;
}) {
    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Good morning';
          } else if (currentHour < 18) {
            return 'Good afternoon';
          } else {
            return 'Good evening';
          }
        };
    return (
      <main>
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="relative h-full w-full bg-slate-950">
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            </div>
        {/* Header */}
        <div className="flex justify-between items-center mb-16 mt-16">
            <div>
                <h1 className="text-3xl font-bold">{getGreeting()}, User.</h1>
                <p className="text-sm">Please select your transaction</p>
            </div>
            <div className="text-right">
                <p className="text-xl">{new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                <div className="flex items-center justify-end mt-1">
                    {/* <span className="text-lg mr-2"><Weather />°C</span> */}
                    <div className="bg-gray-600 rounded-full p-2">
                    {/* Weather Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V2m0 12V8m-8 4h8m-4-4v4m2 2v4m0-8h8m-4 4v4" />
                    </svg>
                    </div>
            </div>
            </div>
        </div>
        <div>{children}</div>
        <div className="mt-8 text-center text-sm text-gray-400 flex flex-col absolute bottom-10 left-0 w-full">
            <p>Contact center: 0800 7777 | Free SMS: 50223</p>
        </div>
        </div>
      </main>
    );
}