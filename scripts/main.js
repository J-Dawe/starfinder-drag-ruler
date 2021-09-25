Hooks.once("dragRuler.ready", (SpeedProvider) => {
    class StarfinderSpeedProvider extends SpeedProvider {
        get colors() {
            return [
                {id: "walk", default: 0x00FF00, name: "sfrpg.speeds.walk"},
                {id: "dash", default: 0xFFFF00, name: "sfrpg.speeds.dash"},
                {id: "run", default: 0xFF8000, name: "sfrpg.speeds.run"},
            ]
        }

        getRanges(token) {
            const actorType = token.actor.data.type;

            if (actorType === "hazard") {
                return [];
            }

            if (actorType === "starship") {
                const baseSpeed = token.actor.data.data.attributes.speed.value;
                return [
                    {range: baseSpeed, color: "walk"},
                    {range: Math.floor(baseSpeed * 1.5), color: "dash"}
                ];
            }

            if (actorType === "vehicle") {
                const driveSpeed = parseFloat(token.actor.data.data.attributes.speed.drive);
                const fullSpeed = parseFloat(token.actor.data.data.attributes.speed.full);
                return [
                    {range: driveSpeed, color: "walk"},
                    {range: driveSpeed * 2, color: "dash"},
                    {range: fullSpeed, color: "run"}
                ];
            }

            const mainMovement = token.actor.data.data.attributes.speed.mainMovement ?? "land";
            const baseSpeed = token.actor.data.data.attributes.speed[mainMovement].value;
            return [
                {range: baseSpeed, color: "walk"},
                {range: baseSpeed * 2, color: "dash"},
                {range: baseSpeed * 4, color: "run"}
            ];
        }
    }

    dragRuler.registerModule("starfinder-drag-ruler", StarfinderSpeedProvider);
})