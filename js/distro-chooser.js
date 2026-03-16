console.log("test");
function distroChooser() {
    return {
        step: 0,
        distros: [],
        winners: [],
        fetchDistrosFromJSON() {
            fetch("/data/distros.json")
                .then((response) => response.json())
                .then((data) => {
                    this.distros = data.map((d) => ({ ...d, points: 0 }));
                    console.log("Distros loaded:", this.distros);
                })
                .catch((error) => console.error("Error fetching distros:", error));
        },
        init() {
            this.fetchDistrosFromJSON();
        },
        addPoints(usrInput) {
            let field = null;
            switch (this.step) {
                case 1: {
                    // difficulty
                    field = "difficulty";
                    break;
                }
                case 2: {
                    // stability
                    field = "stability";
                    break;
                }
                case 3: {
                    // release cycle
                    for (let i = 0; i < this.distros.length; i++) {
                        if (this.distros[i].releases === usrInput) {
                            this.distros[i].points += 5;
                            console.log(`Added 5 points to ${this.distros[i].name}`);
                        }
                    }
                    break;
                }
                case 4: {
                    // gaming
                    field = "gaming";
                    break;
                }
            }
            if (field) {
                for (let i = 0; i < this.distros.length; i++) {
                    let bfrPoints = this.distros[i].points;
                    let diff = Math.abs(this.distros[i][field] - usrInput);
                    this.distros[i].points += 10 - diff;
                    console.log(
                        `Added ${this.distros[i].points - bfrPoints} points to ${this.distros[i].name}`,
                    );
                }
            }
        },

        showResults() {
            const copyDistr = [...this.distros]; // Ensure copyDistr is declared with const
            copyDistr.sort((a, b) => b.points - a.points);
            console.log("Results:", JSON.parse(JSON.stringify(copyDistr))); // Deep clone to avoid Proxy issues
            this.distros = copyDistr;
            this.winners = copyDistr.slice(0, 3);
            console.log("Top 3 Distros:", JSON.parse(JSON.stringify(this.winners))); // Deep clone to avoid Proxy issues
        },
    };
}