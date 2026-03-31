"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Utensils, IceCream, Droplets, ChevronLeft, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const allMenuItems = {
  "Burgers": [
    { id: 1, name: "Wagyu Heritage", price: "$28", desc: "Aged cheddar, caramelized onions, truffle aioli, toasted brioche", img: "https://plus.unsplash.com/premium_photo-1661387558893-63d24776cf38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z291cm1ldCUyMGJ1cmdlcnxlbnwwfHx8fDE3NzQ5NDc3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 2, name: "Smoky BBQ Bacon", price: "$24", desc: "Crispy bacon, monterey jack, house bbq sauce, brioche bun", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Z291cm1ldCUyMGJ1cmdlcnxlbnwwfHx8fDE3NzQ5NDc3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 3, name: "Mushroom Gruyère", price: "$26", desc: "Sautéed cremini, melted swiss, garlic confit spread", img: "https://images.unsplash.com/photo-1632898658005-af95f6fa589c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z291cm1ldCUyMGJ1cmdlcnxlbnwwfHx8fDE3NzQ5NDc3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 4, name: "Truffle Chicken", price: "$25", desc: "Crispy buttermilk chicken, truffle mayo, heirloom tomato", img: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Z291cm1ldCUyMGJ1cmdlcnxlbnwwfHx8fDE3NzQ5NDc3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 5, name: "Blue Cheese Port", price: "$30", desc: "Roquefort crumbles, balsamic onions, fig jam, arugula", img: "https://plus.unsplash.com/premium_photo-1661601722152-87143d4be5b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Z291cm1ldCUyMGJ1cmdlcnxlbnwwfHx8fDE3NzQ5NDc3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 6, name: "Spicy Diavola", price: "$22", desc: "Spiced beef patty, jalapeño relish, pepper jack, sriracha", img: "https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Z291cm1ldCUyMGJ1cmdlcnxlbnwwfHx8fDE3NzQ5NDc3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 7, name: "Avocado Garden", price: "$21", desc: "Plant-based patty, fresh avocado, pickled onions, sprouts", img: "https://images.unsplash.com/photo-1632898657953-f41f81bfa892?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Z291cm1ldCUyMGJ1cmdlcnxlbnwwfHx8fDE3NzQ5NDc3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 8, name: "Double Smash Heritage", price: "$27", desc: "Two wagyu patties, secret sauce, butter lettuce", img: "https://images.unsplash.com/photo-1632898657999-ae6920976661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Z291cm1ldCUyMGJ1cmdlcnxlbnwwfHx8fDE3NzQ5NDc3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 9, name: "Golden Morning", price: "$23", desc: "Wagyu beef, sunny side egg, maple glaze, hash brown", img: "https://plus.unsplash.com/premium_photo-1695822019254-29dbf739474d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Z291cm1ldCUyMGJ1cmdlcnxlbnwwfHx8fDE3NzQ5NDc3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" }
  ],
  "Pizzas": [
    { id: 10, name: "Neapolitan Gold", price: "$24", desc: "Buffalo mozzarella, San Marzano tomatoes, fresh basil", img: "https://plus.unsplash.com/premium_photo-1730829256766-94d297540c23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YXJ0aXNhbmFsJTIwcGl6emF8ZW58MHx8fHwxNzc0OTQ3Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 11, name: "Truffle Bianco", price: "$34", desc: "Wild mushrooms, fontina, truffle oil, roasted garlic", img: "https://images.unsplash.com/photo-1760538635911-dee3b46f2011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YXJ0aXNhbmFsJTIwcGl6emF8ZW58MHx8fHwxNzc0OTQ3Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 12, name: "Quattro Formaggi", price: "$28", desc: "Gorgonzola, provolone, parmigiano, mozzarella", img: "https://images.unsplash.com/photo-1773308498493-ea7b44ac8237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8YXJ0aXNhbmFsJTIwcGl6emF8ZW58MHx8fHwxNzc0OTQ3Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 13, name: "Burrata & Prosciutto", price: "$32", desc: "Creamy burrata, 24-month parma ham, arugula, balsamic", img: "https://images.unsplash.com/photo-1763478279936-4d8f6e86b42c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8YXJ0aXNhbmFsJTIwcGl6emF8ZW58MHx8fHwxNzc0OTQ3Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 14, name: "Spiced Wagyu Nduja", price: "$30", desc: "Spicy beef nduja, caramelized onions, local honey", img: "https://plus.unsplash.com/premium_photo-1733306588881-0411931d4fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8YXJ0aXNhbmFsJTIwcGl6emF8ZW58MHx8fHwxNzc0OTQ3Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 15, name: "Garden Pesto", price: "$26", desc: "House pesto, pine nuts, roasted peppers, goat cheese", img: "https://images.unsplash.com/photo-1767065604207-8876c6bfb5be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8YXJ0aXNhbmFsJTIwcGl6emF8ZW58MHx8fHwxNzc0OTQ3Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 16, name: "Marine Royale", price: "$36", desc: "Smoked salmon, capers, dill cream, red onion petals", img: "https://images.unsplash.com/photo-1750127060930-ea1cdc1e59a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8YXJ0aXNhbmFsJTIwcGl6emF8ZW58MHx8fHwxNzc0OTQ3Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 17, name: "Fig & Goat Cheese", price: "$29", desc: "Dried figs, honey, local goat cheese, toasted walnuts", img: "https://images.unsplash.com/photo-1761315631938-78655074ed09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8YXJ0aXNhbmFsJTIwcGl6emF8ZW58MHx8fHwxNzc0OTQ3Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 18, name: "Rustic Pepperoni", price: "$22", desc: "Hand-cut pepperoni, oregano, classic tomato base", img: "https://plus.unsplash.com/premium_photo-1723478504723-9154bcf09153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8YXJ0aXNhbmFsJTIwcGl6emF8ZW58MHx8fHwxNzc0OTQ3Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080" }
  ],
  "Ice Cream": [
    { id: 19, name: "Gilded Vanilla", price: "$12", desc: "Madagascar vanilla bean, 24k gold leaf, berry gastrique", img: "https://plus.unsplash.com/premium_photo-1671559020847-2d9ef2efc3c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z291cm1ldCUyMGdlbGF0byUyMGljZSUyMGNyZWFtfGVufDB8fHx8MTc3NDk0Nzc4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 20, name: "Pistachio Sorbet", price: "$14", desc: "Roasted Sicilian pistachios, sea salt, nut crumble", img: "https://images.unsplash.com/photo-1763469026365-e5f39b418cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Z291cm1ldCUyMGdlbGF0byUyMGljZSUyMGNyZWFtfGVufDB8fHx8MTc3NDk0Nzc4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 21, name: "Dark Estate Cacao", price: "$13", desc: "72% single-origin dark chocolate, espresso dust", img: "https://images.unsplash.com/photo-1740596261026-83a5f4ab68c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Z291cm1ldCUyMGdlbGF0byUyMGljZSUyMGNyZWFtfGVufDB8fHx8MTc3NDk0Nzc4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 22, name: "Honey & Lavender", price: "$15", desc: "Wildflower honey, fresh lavender, honeycomb shards", img: "https://images.unsplash.com/photo-1765478006783-2df9698dfef6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Z291cm1ldCUyMGdlbGF0byUyMGljZSUyMGNyZWFtfGVufDB8fHx8MTc3NDk0Nzc4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 23, name: "Tahitian Salted Caramel", price: "$14", desc: "Slow-cooked burnt caramel, flaked sea salt", img: "https://plus.unsplash.com/premium_photo-1733306657240-a398488ea835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Z291cm1ldCUyMGdlbGF0byUyMGljZSUyMGNyZWFtfGVufDB8fHx8MTc3NDk0Nzc4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 24, name: "Midnight Matcha", price: "$16", desc: "Ceremonial grade matcha, white chocolate ripple", img: "https://images.unsplash.com/photo-1764337008605-44abfb0f3816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Z291cm1ldCUyMGdlbGF0byUyMGljZSUyMGNyZWFtfGVufDB8fHx8MTc3NDk0Nzc4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 25, name: "Rose Petal Artisan", price: "$18", desc: "Infused rose water, candied petals, lychee pieces", img: "https://images.unsplash.com/photo-1697779784069-f3f596f08588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Z291cm1ldCUyMGdlbGF0byUyMGljZSUyMGNyZWFtfGVufDB8fHx8MTc3NDk0Nzc4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 26, name: "Wild Berry Swirl", price: "$13", desc: "Blackberry, raspberry, blueberry coulis, cream", img: "https://images.unsplash.com/photo-1766017087286-742264987a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Z291cm1ldCUyMGdlbGF0byUyMGljZSUyMGNyZWFtfGVufDB8fHx8MTc3NDk0Nzc4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 27, name: "Espresso Crunch", price: "$15", desc: "In-house roasted coffee, dark chocolate pearls", img: "https://plus.unsplash.com/premium_photo-1738063987905-517b0f4b067d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Z291cm1ldCUyMGdlbGF0byUyMGljZSUyMGNyZWFtfGVufDB8fHx8MTc3NDk0Nzc4MHww&ixlib=rb-4.1.0&q=80&w=1080" }
  ],
  "Juices": [
    { id: 28, name: "Sunrise Pomegranate", price: "$10", desc: "Cold-pressed pomegranate, orange, ginger root", img: "https://plus.unsplash.com/premium_photo-1699976103672-41d04ee68de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y29sZCUyMHByZXNzZWQlMjBvcmdhbmljJTIwanVpY2UlMjBnbGFzc3xlbnwwfHx8fDE3NzQ5NDc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 29, name: "Emerald Vitality", price: "$12", desc: "Kale, cucumber, green apple, lime, mint splash", img: "https://images.unsplash.com/photo-1663308032796-5db81798ff21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y29sZCUyMHByZXNzZWQlMjBvcmdhbmljJTIwanVpY2UlMjBnbGFzc3xlbnwwfHx8fDE3NzQ5NDc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 30, name: "Berry Botanic", price: "$14", desc: "Wild strawberries, blueberries, chia seeds", img: "https://images.unsplash.com/photo-1728777187089-1af2c5facff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y29sZCUyMHByZXNzZWQlMjBvcmdhbmljJTIwanVpY2UlMjBnbGFzc3xlbnwwfHx8fDE3NzQ5NDc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 31, name: "Sunset Gold", price: "$11", desc: "Pineapple, turmeric, lemon, black pepper infusion", img: "https://images.unsplash.com/photo-1572266228826-68b1685e580d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y29sZCUyMHByZXNzZWQlMjBvcmdhbmljJTIwanVpY2UlMjBnbGFzc3xlbnwwfHx8fDE3NzQ5NDc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 32, name: "Crimson Beet", price: "$12", desc: "Beetroot, carrot, ginger, lemon, orange zest", img: "https://plus.unsplash.com/premium_photo-1667251757355-b3db687473bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y29sZCUyMHByZXNzZWQlMjBvcmdhbmljJTIwanVpY2UlMjBnbGFzc3xlbnwwfHx8fDE3NzQ5NDc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 33, name: "Tropical Zenith", price: "$13", desc: "Passion fruit, dragon fruit, coconut water", img: "https://images.unsplash.com/photo-1472982072373-d7bcc196aabc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y29sZCUyMHByZXNzZWQlMjBvcmdhbmljJTIwanVpY2UlMjBnbGFzc3xlbnwwfHx8fDE3NzQ5NDc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 34, name: "Apple Heritage", price: "$9", desc: "Pressed fuji apples, cinnamon touch, vanilla", img: "https://images.unsplash.com/photo-1723960676396-c8d17f502f21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Y29sZCUyMHByZXNzZWQlMjBvcmdhbmljJTIwanVpY2UlMjBnbGFzc3xlbnwwfHx8fDE3NzQ5NDc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 35, name: "Zen Watermelon", price: "$10", desc: "Watermelon, lime, pink sea salt, basil", img: "https://images.unsplash.com/photo-1570615541379-e6b7ab6d4eb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Y29sZCUyMHByZXNzZWQlMjBvcmdhbmljJTIwanVpY2UlMjBnbGFzc3xlbnwwfHx8fDE3NzQ5NDc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 36, name: "Ginger Shot Detox", price: "$8", desc: "Pure ginger, lemon, honey, cayenne kick", img: "https://plus.unsplash.com/premium_photo-1723541677516-a628f7424162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8Y29sZCUyMHByZXNzZWQlMjBvcmdhbmljJTIwanVpY2UlMjBnbGFzc3xlbnwwfHx8fDE3NzQ5NDc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080" }
  ],
  "Coffee": [
    { id: 37, name: "Bourbon Latte", price: "$12", desc: "House blend with oaky undertones & vanilla cloud foam", img: "https://plus.unsplash.com/premium_photo-1679548650479-a9aa1760b291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3BlY2lhbHR5JTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBlc3ByZXNzb3xlbnwwfHx8fDE3NzQ5NDc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 38, name: "Espresso Roman", price: "$8", desc: "Double shot of single-origin robusta, lemon twist", img: "https://images.unsplash.com/photo-1603828778059-6e52a251fd2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8c3BlY2lhbHR5JTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBlc3ByZXNzb3xlbnwwfHx8fDE3NzQ5NDc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 39, name: "Caramel Velvet", price: "$14", desc: "Slow-drip cold brew, salted artisanal caramel", img: "https://images.unsplash.com/photo-1634709170162-23a76022e9c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8c3BlY2lhbHR5JTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBlc3ByZXNzb3xlbnwwfHx8fDE3NzQ5NDc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 40, name: "Midnight Cortado", price: "$10", desc: "Equal parts espresso and steamed milk, bold finish", img: "https://images.unsplash.com/photo-1602531151551-c51e384ff73c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8c3BlY2lhbHR5JTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBlc3ByZXNzb3xlbnwwfHx8fDE3NzQ5NDc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 41, name: "White Velvet Flat", price: "$11", desc: "Creamy micro-foam, single estate beans", img: "https://plus.unsplash.com/premium_photo-1666308424624-a8a212189c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8c3BlY2lhbHR5JTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBlc3ByZXNzb3xlbnwwfHx8fDE3NzQ5NDc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 42, name: "Nitro Heritage", price: "$13", desc: "Infused with nitrogen for a silky, stout-like head", img: "https://images.unsplash.com/photo-1761526443792-bddba5d480b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8c3BlY2lhbHR5JTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBlc3ByZXNzb3xlbnwwfHx8fDE3NzQ5NDc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 43, name: "Affogato Artisan", price: "$16", desc: "Double shot over Gilded Vanilla gelato", img: "https://images.unsplash.com/photo-1762723814157-eec923579206?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8c3BlY2lhbHR5JTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBlc3ByZXNzb3xlbnwwfHx8fDE3NzQ5NDc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 44, name: "Mocha Ganache", price: "$15", desc: "72% dark chocolate melts, espresso, velvet milk", img: "https://images.unsplash.com/photo-1766166793102-a06d1ed35a44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8c3BlY2lhbHR5JTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBlc3ByZXNzb3xlbnwwfHx8fDE3NzQ5NDc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 45, name: "The Gold Ritual", price: "$45", desc: "Our rarest bean, manual pour-over, 24k gold", img: "https://plus.unsplash.com/premium_photo-1664970900086-adc85f1ef317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8c3BlY2lhbHR5JTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBlc3ByZXNzb3xlbnwwfHx8fDE3NzQ5NDc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" }
  ]
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Burgers");

  return (
    <main className="min-h-screen bg-[#FDF8F5] text-[#2C1810]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#FDF8F5]/80 backdrop-blur-xl border-b border-[#D4A373]/10 px-6 py-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
          <ChevronLeft className="w-5 h-5 text-[#D4A373]" />
          <span className="text-[10px] uppercase font-black tracking-widest">Back To Sanctuary</span>
        </Link>
        <div className="text-xl md:text-2xl font-playfair font-black tracking-tighter">
          BREWED<span className="text-[#3D4A3A]">MENU</span>
        </div>
        <div className="w-24 hidden md:block" />
      </nav>

      {/* Hero Banner */}
      <section className="pt-32 pb-12 px-6 md:px-12 text-center bg-[#2C1810] text-[#FDF8F5]">
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="max-w-4xl mx-auto space-y-6 py-12"
         >
            <span className="text-[#D4A373] text-[10px] tracking-[0.5em] font-black uppercase">The Global Selection</span>
            <h1 className="text-6xl md:text-8xl font-playfair font-bold">Crafted To Perfection.</h1>
            <p className="opacity-60 text-lg font-light italic max-w-2xl mx-auto">
              Our complete 45-item library of sensory obsessions. Michelin-inspired gastronomy for the discerning palate.
            </p>
         </motion.div>
      </section>

      {/* Categories Tabs */}
      <section className="sticky top-[72px] z-40 bg-[#FDF8F5] border-b border-[#D4A373]/10 px-6 overflow-x-auto py-6 no-scrollbar">
         <div className="flex justify-center md:gap-8 gap-4 w-max md:w-full mx-auto">
            {Object.keys(allMenuItems).map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] uppercase font-black tracking-widest transition-all ${
                   activeCategory === cat ? "bg-[#2C1810] text-[#FDF8F5] shadow-xl" : "text-[#2C1810]/40 hover:text-[#2C1810]"
                 }`}
               >
                 {cat === "Burgers" && <Utensils className="w-3 h-3" />}
                 {cat === "Pizzas" && <Sparkles className="w-3 h-3" />}
                 {cat === "Ice Cream" && <IceCream className="w-3 h-3" />}
                 {cat === "Juices" && <Droplets className="w-3 h-3" />}
                 {cat === "Coffee" && <Coffee className="w-3 h-3" />}
                 {cat}
               </button>
            ))}
         </div>
      </section>

      {/* Menu Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="wait">
               {allMenuItems[activeCategory].map((item, idx) => (
                 <motion.div
                   key={item.id}
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -30 }}
                   transition={{ duration: 0.8, delay: idx * 0.05 }}
                   className="group bg-white rounded-[50px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-[#D4A373]/10 flex flex-col"
                 >
                    <div className="h-72 relative overflow-hidden">
                       <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                       <div className="absolute top-6 right-6 bg-[#2C1810] text-[#FDF8F5] px-6 py-2 rounded-full text-[10px] font-bold z-10 shadow-xl border border-white/10">
                          {item.price}
                       </div>
                    </div>
                    <div className="p-10 space-y-4 flex-grow flex flex-col">
                       <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                          {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-[#D4A373] text-[#D4A373]" />)}
                       </div>
                       <h3 className="text-2xl font-playfair font-bold text-[#2C1810] group-hover:text-[#D4A373] transition-colors">{item.name}</h3>
                       <p className="text-sm opacity-60 font-light leading-relaxed flex-grow">{item.desc}</p>
                       <button className="w-full bg-[#FDF8F5] text-[#2C1810] border border-[#2C1810]/10 py-5 rounded-full text-[10px] uppercase font-black tracking-widest group-hover:bg-[#2C1810] group-hover:text-[#FDF8F5] transition-all flex items-center justify-center gap-3 mt-8">
                          Add To Order <Sparkles className="w-3 h-3" />
                       </button>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </section>

      {/* Specialty Banner */}
      <section className="py-40 px-6 bg-[#D4A373]/10 text-center border-t border-[#D4A373]/10">
         <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-7xl font-playfair italic tracking-tight">The Tasting Flight</h2>
            <p className="opacity-70 font-light text-xl">
               Experience the complete range of our culinary collection in a single sitting. <br/> 
               Designed for groups of 4 or more.
            </p>
            <button className="bg-[#2C1810] text-[#FDF8F5] px-16 py-6 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#3D4A3A] transition-all shadow-2xl">
              Book A Tasting Event
            </button>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#2C1810] text-center border-t border-white/5">
         <p className="text-[10px] uppercase tracking-[0.5em] text-[#FDF8F5]/30 font-bold">
            BREWED CRAFT ARTISANAL COLLECTIVE • {new Date().getFullYear()}
         </p>
      </footer>
    </main>
  );
}
