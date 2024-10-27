const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");
const express = require("express");
require("dotenv").config();

const app = express();
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(3000, () => console.log("Express server started"));

// Initialize the bot client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Define gang roles, their elders, and the "Dog" role
const gangs = {
    PUPS: {
        roleId: "1060263517262987385",
        elderRoleId: "1060766782140461126",
        members: [],
        stats: [],
    },
    WC: {
        roleId: "1060263761904156753",
        elderRoleId: "1070354776677695629",
        members: [],
        stats: [],
    },
    SH: {
        roleId: "1072263364329345135",
        elderRoleId: "1072275421078491226",
        members: [],
        stats: [],
    },
};
const dogRoleId = "1060263893726941285"; // Replace with your actual "Dog" role ID

// User and channel IDs
const friendUserId = "1053412182337011732";
const allowedChannelId = "1128464024519057458";

client.on("ready", async () => {
    console.log("Bot is online!");

    const guildId = "1060262597833797794"; // Replace with your actual guild ID
    const guild = client.guilds.cache.get(guildId);
    if (guild) {
        const commands = [
            new SlashCommandBuilder()
                .setName("addplayer")
                .setDescription("Adds a player to a gang and assigns Dog role")
                .addUserOption((option) =>
                    option
                        .setName("player")
                        .setDescription("Select the player")
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName("gang")
                        .setDescription("Select the gang")
                        .setRequired(true)
                        .addChoices(
                            { name: "PUPS", value: "PUPS" },
                            { name: "WC", value: "WC" },
                            { name: "SH", value: "SH" },
                        ),
                ),

            new SlashCommandBuilder()
                .setName("removeplayer")
                .setDescription(
                    "Removes a player from a gang and removes Dog role",
                )
                .addUserOption((option) =>
                    option
                        .setName("player")
                        .setDescription("Select the player")
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName("gang")
                        .setDescription("Select the gang")
                        .setRequired(true)
                        .addChoices(
                            { name: "PUPS", value: "PUPS" },
                            { name: "WC", value: "WC" },
                            { name: "SH", value: "SH" },
                        ),
                ),

            new SlashCommandBuilder()
                .setName("addstats")
                .setDescription("Add stats for a player")
                .addUserOption((option) =>
                    option
                        .setName("player")
                        .setDescription("Select the player")
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName("car1")
                        .setDescription("Enter stats for car 1")
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName("car2")
                        .setDescription("Enter stats for car 2")
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName("car3")
                        .setDescription("Enter stats for car 3")
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName("gang")
                        .setDescription("Select the gang")
                        .setRequired(true)
                        .addChoices(
                            { name: "PUPS", value: "PUPS" },
                            { name: "WC", value: "WC" },
                            { name: "SH", value: "SH" },
                        ),
                ),

            new SlashCommandBuilder()
                .setName("statleaderboard")
                .setDescription("Show stats leaderboard for a gang")
                .addStringOption((option) =>
                    option
                        .setName("gang")
                        .setDescription("Select the gang")
                        .setRequired(true)
                        .addChoices(
                            { name: "PUPS", value: "PUPS" },
                            { name: "WC", value: "WC" },
                            { name: "SH", value: "SH" },
                        ),
                ),

            new SlashCommandBuilder()
                .setName("listplayers")
                .setDescription("List all players in a gang")
                .addStringOption((option) =>
                    option
                        .setName("gang")
                        .setDescription("Select the gang")
                        .setRequired(true)
                        .addChoices(
                            { name: "PUPS", value: "PUPS" },
                            { name: "WC", value: "WC" },
                            { name: "SH", value: "SH" },
                        ),
                ),

            new SlashCommandBuilder()
                .setName("annoyoverheat")
                .setDescription('Annoy your friend by spamming "noog"'),
        ];

        await guild.commands.set(commands);
        console.log("Commands registered");
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    try {
        if (commandName === "addplayer" || commandName === "removeplayer") {
            // Your code for addplayer and removeplayer goes here
        }

        if (commandName === "addstats") {
            // Your code for addstats goes here
        }

        if (commandName === "statleaderboard") {
            // Your code for statleaderboard goes here
        }

        if (commandName === "listplayers") {
            // Your code for listplayers goes here
        }

        if (commandName === "annoyoverheat") {
            // Your code for annoyoverheat goes here
        }
    } catch (error) {
        console.error(`Error processing command ${commandName}:`, error);
        await interaction.reply({
            content: "There was an error executing this command.",
            ephemeral: true,
        });
    }
});

// Role IDs by gang and building type
const roles = {
    PUPS: {
        "Link 1": "1070353398622339143",
        "Link 2": "1070353458886090813",
        "Link 3": "1070353499033980989",
        Factory: "1070353542939934730",
        Arena: "1070353593481310240",
        Warehouse: "1061362153128464524",
        Dock: "1061362085486932068",
        Gaspump: "1070353178618507364",
    },
    WC: {
        "Link 1": "1098639397106241566",
        "Link 2": "1098639448809418935",
        "Link 3": "1098639490152665089",
        Factory: "1098639556703699115",
        Arena: "1098639602648088687",
        Warehouse: "1098639648244379698",
        Dock: "1098639721590165504",
        Gaspump: "1098639802728992869",
    },
    SH: {
        "Link 1": "1071982045380751400",
        "Link 2": "1071982133251428403",
        "Link 3": "1071982163546877984",
        Factory: "1071982197814349844",
        Arena: "1071982288251920414",
        Warehouse: "1071982315632349284",
        Dock: "1071982339304980560",
        Gaspump: "1071982362084257922",
    },
};

// Tracking player placements
const placements = {};

// Register slash commands
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.application.commands.set([
        new SlashCommandBuilder()
            .setName("tracker")
            .setDescription("Track your car placement")
            .addStringOption((option) =>
                option
                    .setName("building")
                    .setDescription(
                        "Select the building where you placed your car",
                    )
                    .setRequired(true)
                    .addChoices(
                        { name: "Factory", value: "Factory" },
                        { name: "Arena", value: "Arena" },
                        { name: "Dock", value: "Dock" },
                        { name: "Warehouse", value: "Warehouse" },
                        { name: "Gaspump", value: "Gaspump" },
                        { name: "Link 1", value: "Link 1" },
                        { name: "Link 2", value: "Link 2" },
                        { name: "Link 3", value: "Link 3" },
                    ),
            )
            .addStringOption((option) =>
                option
                    .setName("gang")
                    .setDescription("Select your gang")
                    .setRequired(true)
                    .addChoices(
                        { name: "PUPS", value: "PUPS" },
                        { name: "WC", value: "WC" },
                        { name: "SH", value: "SH" },
                    ),
            ),
        new SlashCommandBuilder()
            .setName("showtracker")
            .setDescription("Display all car placements for the gang"),
    ]);
});

// Handle slash commands
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, options, member } = interaction;

    if (commandName === "tracker") {
        const building = options.getString("building");
        const gang = options.getString("gang");
        const roleId = roles[gang][building];

        if (!roleId) {
            return interaction.reply({
                content: `Error: Building or gang not found.`,
                ephemeral: true,
            });
        }

        // Add role to member
        try {
            await member.roles.add(roleId);
            if (!placements[gang]) placements[gang] = {};
            if (!placements[gang][member.id]) placements[gang][member.id] = [];
            if (
                placements[gang][member.id].length < 3 &&
                !placements[gang][member.id].includes(building)
            ) {
                placements[gang][member.id].push(building);
            }
            await interaction.reply({
                content: `You've been assigned the role for ${building} in gang ${gang}.`,
                ephemeral: true,
            });
        } catch (error) {
            console.error("Error assigning role:", error);
            await interaction.reply({
                content: `Failed to assign the role.`,
                ephemeral: true,
            });
        }
    }

    if (commandName === "showtracker") {
        let message = "";
        for (const gang in placements) {
            message += `**${gang} Placements:**\n`;
            for (const playerId in placements[gang]) {
                const buildings = placements[gang][playerId].join(", ");
                message += `<@${playerId}>: ${buildings}\n`;
            }
            message += "\n";
        }
        await interaction.reply({ content: message || "No placements found." });
    }
});

client.login(
    "MTI5ODU4NDc5Mjc2MTEwNjUxMw.G5jeX3.0Z7yHQZLq87Xe1_lWRxaweBMP7oeGxp7SKnKUs",
);
