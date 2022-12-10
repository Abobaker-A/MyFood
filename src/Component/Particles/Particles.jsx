import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export  const ParticlesCom = () => {
    const particlesInit = useCallback(async engine => {
        
        await loadFull(engine);
    }, []);

  
    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen:{
                    zIndex :-1 
                },
                background: {
                    color: {
                        value: "#000",
                    },
                },
                fpsLimit: 50,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#C69749",
                    },
                    links: {
                        color: "#C69749",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 40,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 2 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};