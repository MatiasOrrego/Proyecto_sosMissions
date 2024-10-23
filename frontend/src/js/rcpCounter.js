// frontend/src/js/rcpCounter.js

class RCPCounter {
    constructor() {
        this.count = 0;
        this.intervalId = null;
    }

    start() {
        this.intervalId = setInterval(() => {
            this.count++;
            console.log(`RCP Count: ${this.count}`);
            // Aquí puedes actualizar el DOM o realizar otras acciones
        }, 1000); // Incrementa el contador cada segundo
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    reset() {
        this.stop();
        this.count = 0;
        console.log('RCP Counter reset');
        // Aquí puedes actualizar el DOM o realizar otras acciones
    }
}

export default RCPCounter;