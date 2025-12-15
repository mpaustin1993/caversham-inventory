import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import HomePage from "./inventory/page";

export default function Home() {
  return (    
    <div className="text-center py-10 min-h-screen">
      <h1 className="text-6xl font-extrabold bg-clip-text drop-shadow-lg">
        Caversham Inventory
      </h1>
      <HomePage />
    </div>
  );
}
