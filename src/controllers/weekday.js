const amountOfDays = async (req, res) => {

    try {

        const { startDay, amountOfDays } = req.query;

        const week = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"]

        if(!startDay) {
            return res.status(400).json("Favor inserir o dia inicial");
        }

        if(!amountOfDays) {
            return res.status(400).json("Favor inserir um número");
        }

        const i = week.indexOf(startDay) + Number(amountOfDays);

        const dayOfTheWeek = week[i % week.length];

        return res.status(200).json(dayOfTheWeek);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    amountOfDays
};