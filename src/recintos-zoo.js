class RecintosZoo {
    constructor() {
        this.animaisPermitidos = {
            LEAO: { tamanho: 3, bioma: ['savana','savana e rio'], tipo: 'carnivoro' },
            LEOPARDO: { tamanho: 2, bioma: ['savana','savana e rio'], tipo: 'carnivoro' },
            CROCODILO: { tamanho: 3, bioma: ['rio','savana e rio'], tipo: 'carnivoro' },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta', 'savana e rio'], tipo: 'herbivoro' },
            GAZELA: { tamanho: 2, bioma: ['savana','savana e rio'], tipo: 'herbivoro' },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio', 'savana e rio'], tipo: 'herbivoro' }
        };

        this.recintos = [
            { numero: 1, bioma: 'savana', total: 10, ocupados: 3, animais: ['MACACO'] },
            { numero: 2, bioma: 'floresta', total: 5, ocupados: 0, animais: [] },
            { numero: 3, bioma: 'savana e rio', total: 7, ocupados: 2, animais: ['GAZELA'] },
            { numero: 4, bioma: 'rio', total: 8, ocupados: 0, animais: [] },
            { numero: 5, bioma: 'savana', total: 9, ocupados: 3, animais: ['LEAO'] }
        ];
    }

    analisaRecintos(animal, quantidade) {
        const animalInfo = this.animaisPermitidos[animal];
        if (!animalInfo) {
            const resultado = { erro: "Animal inválido", recintosViaveis: false };
            console.log(resultado);
            return resultado;
        }
        if (quantidade <= 0) {
            const resultado = { erro: "Quantidade inválida", recintosViaveis: false };
            console.log(resultado);
            return resultado;
        }

        let recintosViaveis = this.recintos.filter(recinto => {
            const biomaCorreto = animalInfo.bioma.includes(recinto.bioma) 
                                  
            let espacoNecessario = quantidade * animalInfo.tamanho;
            const espacoLivre = recinto.total - recinto.ocupados;

            const animaisRecinto = recinto.animais;
            const contemCarnivoros = animaisRecinto.some(anim => this.animaisPermitidos[anim].tipo === 'carnivoro');
            const contemHerbivoros = animaisRecinto.some(anim => this.animaisPermitidos[anim].tipo === 'herbivoro');
            
            if (animaisRecinto.length > 0 && !animaisRecinto.includes(animal)) {
                espacoNecessario += 1;
            }

            if (animalInfo.tipo === 'carnivoro' && contemCarnivoros) {
                const mesmaEspecie = animaisRecinto.every(anim => anim === animal);
                if (!mesmaEspecie) {
                    return false;
                }
            }

            if (animalInfo.tipo === 'herbivoro' && contemCarnivoros || contemHerbivoros && animalInfo.tipo === 'carnivoro') {
                return false;
            }

            if (animal === 'HIPOPOTAMO' && animaisRecinto.length > 0 && recinto.bioma !== 'savana e rio' && !animaisRecinto.includes('HIPOPOTAMO')) {
                return false;
            }

            if (animal === 'MACACO' && animaisRecinto.length === 0 && quantidade <= 1) {
                return false;
            }

            return biomaCorreto && espacoLivre >= espacoNecessario;
        });

        if (recintosViaveis.length === 0) {
            const resultado = { erro: "Não há recinto viável", recintosViaveis: false };
            console.log(resultado);
            return resultado;
        }

        const recintosAlocados = recintosViaveis.map(recinto => {
            let espacoNecessario = quantidade * animalInfo.tamanho;
            if (recinto.animais.length > 0 && !recinto.animais.includes(animal)) {
                espacoNecessario += 1;
            }
            const espacoLivre = recinto.total - (recinto.ocupados + espacoNecessario);
            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.total})`;
        });

        recintosAlocados.sort((a, b) => {
            const numeroA = parseInt(a.match(/\d+/)[0], 10);
            const numeroB = parseInt(b.match(/\d+/)[0], 10);
            return numeroA - numeroB;
        });

        const resultado = { recintosViaveis: recintosAlocados };

        console.log(resultado);

        return resultado;
    }
}

export { RecintosZoo as RecintosZoo };