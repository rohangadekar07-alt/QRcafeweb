"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Utensils, IceCream, Droplets, ChevronLeft, Sparkles, Star, ShoppingBag, X, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchMenu, placeOrder } from "@/utils/api";

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

// Group array into object
const groupMenu = (items) => {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push({
       id: item._id,
       name: item.name,
       price: `$${item.price}`,
       desc: "Freshly prepared",
       img: "https://plus.unsplash.com/premium_photo-1679548650479-a9aa1760b291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3BlY2lhbHR5JTIwY29mZmVlJTIwbGF0dGUlMjBhcnQlMjBlc3ByZXNzb3xlbnwwfHx8fDE3NzQ5NDc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
       available: item.available
    });
    return acc;
  }, {});
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Burgers");
  const [menuItems, setMenuItems] = useState(null);
  const [cart, setCart] = useState([]);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSelection, setActiveSelection] = useState(null); // { id, name, price, qty }
  
  const searchParams = useSearchParams();
  const tableId = searchParams.get("table");

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchMenu();
        const grouped = groupMenu(data);
        if (Object.keys(grouped).length === 0) {
            setMenuItems(allMenuItems); // fallback to hardcoded if empty DB
            setActiveCategory("Burgers");
        } else {
            setMenuItems(grouped);
            setActiveCategory(Object.keys(grouped)[0]);
        }
      } catch (err) {
        console.error("Database connection issue, falling back to local menu:", err);
        setMenuItems(allMenuItems);
        setActiveCategory("Burgers");
      }
    };
    loadMenu();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
       const existing = prev.find(i => i.id === item.id);
       if (existing) {
          return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i);
       }
       return [...prev, item ];
    });
    setActiveSelection(null); // Clear selection after adding to cart
  };

  const openSelection = (item) => {
     setActiveSelection({ ...item, qty: 1 });
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) => {
       const existing = prev.find(i => i.id === id);
       if (!existing) return prev;
       
       const newQty = existing.qty + delta;
       if (newQty <= 0) {
          return prev.filter(i => i.id !== id);
       }
       return prev.map(i => i.id === id ? { ...i, qty: newQty } : i);
    });
  };

  const handlePlaceOrder = async () => {
    if (!tableId) return alert("No table selected! Please scan the QR code to select a table.");
    if (cart.length === 0) return alert("Cart is empty!");
    
    // Calculate Total for DB records
    const totalAmount = cart.reduce((acc, item) => {
       const price = parseFloat(item.price.replace('$', ''));
       return acc + (price * item.qty);
    }, 0);

    setIsOrdering(true);
    try {
      const items = cart.map(c => ({ name: c.name, qty: c.qty }));
      // Place order directly with unpaid status
      await placeOrder(tableId, items, totalAmount, "pending");
      setShowSuccess(true);
      setCart([]);
    } catch (err) {
      alert("Failed to place order: " + err.message);
    } finally {
      setIsOrdering(false);
    }
  };

  if (!menuItems) {
      return <div className="min-h-screen flex items-center justify-center bg-[#FDF8F5]">Loading Menu...</div>;
  }

  return (
    <main className="min-h-screen bg-[#FDF8F5] text-[#2C1810]">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 py-3 md:px-12 ${isScrolled ? "bg-[#FDF8F5]/60 backdrop-blur-2xl border-b border-[#D4A373]/20 shadow-xl" : "bg-[#FDF8F5] md:bg-transparent"}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          {/* Back Action */}
          <Link 
            href={`/${tableId ? `?table=${tableId}` : ""}`} 
            className="group flex items-center gap-3 bg-[#2C1810]/5 hover:bg-[#2C1810] p-2 pr-6 rounded-full transition-all duration-500"
          >
            <div className="bg-[#2C1810] group-hover:bg-[#D4A373] p-1.5 rounded-full text-[#FDF8F5] transition-colors">
               <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="text-[9px] uppercase font-black tracking-[0.2em] text-[#2C1810] group-hover:text-[#FDF8F5] hidden sm:block">Back</span>
          </Link>

          {/* Luxury Brand Center */}
          <div className="flex flex-col items-center">
            <div className="text-xl md:text-3xl font-playfair font-black tracking-tighter text-[#2C1810] relative">
              BREWED<span className="text-[#D4A373]">MENU</span>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#D4A373]/30" />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
               <span className="text-[8px] uppercase tracking-widest font-black opacity-40">Active Table {tableId || 'T1'}</span>
            </div>
          </div>
          
          {/* Cart Interaction */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-3 bg-[#2C1810] text-[#FDF8F5] pl-5 pr-3 py-3 rounded-full shadow-2xl hover:bg-[#3D4A3A] hover:scale-105 active:scale-95 transition-all group border border-white/5"
          >
            <span className="text-[9px] uppercase font-black tracking-widest hidden md:block">Sanctuary Bag</span>
            <div className="relative">
              <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {cart.length > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-[#D4A373] text-[#1A0F0A] w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-[#1A0F0A] shadow-lg shadow-[#D4A373]/40"
                >
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </motion.div>
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Hero Banner Removed */}
      <div className="pt-24 md:pt-32" /> 
      
      {/* Professional Categories Tabs */}
      <section className="sticky top-[72px] z-40 bg-[#FDF8F5]/80 backdrop-blur-xl border-b border-[#2C1810]/5 px-6 py-6 overflow-x-auto no-scrollbar transition-all duration-500">
         <div className="max-w-4xl mx-auto relative">
            <div className="flex justify-center items-center md:gap-4 gap-2 w-max md:w-full mx-auto bg-white/40 p-1.5 rounded-[30px] border border-[#2C1810]/5 shadow-inner">
               {Object.keys(menuItems).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative px-6 py-3 rounded-[24px] transition-all duration-500 group"
                  >
                    {/* Background Active Indicator */}
                    {activeCategory === cat && (
                       <motion.div 
                         layoutId="activeTab"
                         className="absolute inset-0 bg-[#2C1810] rounded-[22px] shadow-[0_10px_30px_rgba(44,24,16,0.25)]"
                         transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                       />
                    )}
                    
                    <div className="relative flex items-center gap-2.5 z-10">
                       <span className={`transition-all duration-500 ${activeCategory === cat ? "text-[#D4A373]" : "text-[#2C1810]/40 group-hover:text-[#2C1810]"}`}>
                          {cat === "Burgers" && <Utensils className="w-3.5 h-3.5" />}
                          {cat === "Pizzas" && <Sparkles className="w-3.5 h-3.5" />}
                          {cat === "Ice Cream" && <IceCream className="w-3.5 h-3.5" />}
                          {cat === "Juices" && <Droplets className="w-3.5 h-3.5" />}
                          {cat === "Coffee" && <Coffee className="w-3.5 h-3.5" />}
                       </span>
                       <span className={`text-[10px] uppercase font-black tracking-[0.2em] transition-all duration-500 ${
                         activeCategory === cat ? "text-white" : "text-[#2C1810]/40 group-hover:text-[#2C1810]"
                       }`}>
                         {cat}
                       </span>
                    </div>

                    {/* Subtle dot indicator for hover */}
                    {activeCategory !== cat && (
                       <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D4A373] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
               ))}
            </div>
         </div>
      </section>

      {/* Menu Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="wait">
               {menuItems[activeCategory]?.map((item, idx) => (
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
                       
                       <div className="mt-8 h-[60px] flex items-center justify-center">
                          {cart.find(c => c.id === item.id) ? (
                            <div className="flex items-center justify-between w-full bg-[#2C1810] text-[#FDF8F5] rounded-full p-2 border border-[#D4A373]/20 shadow-xl overflow-hidden">
                               <button 
                                 onClick={() => updateCartQty(item.id, -1)}
                                 className="w-12 h-12 flex items-center justify-center hover:bg-[#D4A373] hover:text-[#1A0F0A] rounded-full transition-all"
                               >
                                  <Minus className="w-4 h-4" />
                               </button>
                               <span className="font-black text-lg">{cart.find(c => c.id === item.id).qty}</span>
                               <button 
                                 onClick={() => updateCartQty(item.id, 1)}
                                 className="w-12 h-12 flex items-center justify-center hover:bg-[#D4A373] hover:text-[#1A0F0A] rounded-full transition-all"
                               >
                                  <Plus className="w-4 h-4" />
                               </button>
                            </div>
                          ) : (
                            <button onClick={() => openSelection(item)} className="w-full bg-[#FDF8F5] text-[#2C1810] border border-[#2C1810]/10 py-5 rounded-full text-[10px] uppercase font-black tracking-widest group-hover:bg-[#2C1810] group-hover:text-[#FDF8F5] transition-all flex items-center justify-center gap-3">
                               Add to Order <Plus className="w-3 h-3" />
                            </button>
                          )}
                       </div>
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

      {/* Floating Cart Drawer (Right Side Sidebar) */}
      <AnimatePresence>
         {isCartOpen && (
             <>
               {/* Backdrop */}
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsCartOpen(false)}
                 className="fixed inset-0 bg-[#1A0F0A]/60 backdrop-blur-md z-[60]"
               />
               
               {/* Drawer */}
               <motion.div 
                 initial={{ x: "100%" }}
                 animate={{ x: 0 }}
                 exit={{ x: "100%" }}
                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
                 className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] bg-[#FDF8F5] shadow-[-20px_0_60px_rgba(0,0,0,0.1)] z-[70] flex flex-col"
               >
                 <div className="p-8 border-b border-[#D4A373]/10 flex justify-between items-center bg-[#2C1810] text-[#FDF8F5]">
                    <div>
                       <h3 className="text-2xl font-playfair font-bold">Your Order Stack</h3>
                       <p className="text-[10px] uppercase tracking-widest opacity-60">Table {tableId || 'Unassigned Santuary'}</p>
                    </div>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                       <X className="w-6 h-6" />
                    </button>
                 </div>

                 <div className="flex-grow overflow-y-auto p-8 space-y-6">
                    {cart.length === 0 ? (
                       <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4">
                          <ShoppingBag className="w-16 h-16" />
                          <p className="uppercase tracking-[0.2em] font-black text-[10px]">Your stack is empty.</p>
                       </div>
                    ) : (
                       cart.map((item) => (
                         <div key={item.id} className="flex gap-4 items-center group bg-white p-4 rounded-3xl border border-[#D4A373]/10 shadow-sm hover:shadow-md transition-all">
                            <div className="w-16 h-16 relative flex-shrink-0 rounded-2xl overflow-hidden border border-[#D4A373]/20">
                               <Image src={item.img} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-grow space-y-1">
                               <h4 className="font-playfair font-bold text-sm leading-tight">{item.name}</h4>
                               <p className="text-[10px] text-[#D4A373] font-bold">{item.price}</p>
                            </div>
                            <div className="flex items-center gap-2">
                               <div className="flex items-center bg-[#FDF8F5] rounded-full border border-[#D4A373]/10 scale-90 md:scale-100">
                                  <button 
                                    onClick={() => updateCartQty(item.id, -1)}
                                    className="p-2 hover:text-[#D4A373]"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-6 text-center text-xs font-bold">{item.qty}</span>
                                  <button 
                                    onClick={() => updateCartQty(item.id, 1)}
                                    className="p-2 hover:text-[#3D4A3A]"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                               </div>
                            </div>
                         </div>
                       ))
                    )}
                 </div>

                 {cart.length > 0 && (
                    <div className="p-8 bg-white border-t border-[#D4A373]/10 space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                       <div className="flex justify-between items-center px-2">
                          <span className="text-[10px] uppercase font-black tracking-widest opacity-40">Subtotal Estimated</span>
                          <span className="text-2xl font-playfair font-black text-[#2C1810]">
                             ${cart.reduce((a, b) => a + (parseFloat(b.price.replace('$','')) * b.qty), 0).toFixed(2)}
                          </span>
                       </div>
                       <button 
                         onClick={async () => {
                            await handlePlaceOrder();
                            setIsCartOpen(false);
                         }} 
                         disabled={isOrdering}
                         className="w-full bg-[#2C1810] text-[#FDF8F5] py-6 rounded-full font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:bg-[#3D4A3A] transition-all flex items-center justify-center gap-3"
                       >
                          {isOrdering ? "Transmitting..." : "Confirm & Send to Kitchen"} <Sparkles className="w-4 h-4" />
                       </button>
                    </div>
                 )}
               </motion.div>
             </>
         )}
      </AnimatePresence>

      {/* Step 2: Contextual Selection Bar (appears when item selected) */}
      <AnimatePresence>
         {activeSelection && (
             <motion.div 
               initial={{ y: 100, opacity: 0 }} 
               animate={{ y: 0, opacity: 1 }} 
               exit={{ y: 100, opacity: 0 }}
               className="fixed bottom-10 right-6 z-[55] w-[90%] md:w-auto"
             >
                <div className="bg-[#2C1810] text-[#FDF8F5] p-6 rounded-[35px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-8 border border-white/10 backdrop-blur-3xl">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 relative rounded-full overflow-hidden border border-[#D4A373]/30">
                         <Image src={activeSelection.img} alt={activeSelection.name} fill className="object-cover" />
                      </div>
                      <div>
                         <h4 className="font-playfair font-bold text-lg leading-tight">{activeSelection.name}</h4>
                         <p className="text-[10px] uppercase tracking-widest text-[#D4A373] font-black">{activeSelection.price}</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-6">
                      <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                         <button 
                           onClick={() => activeSelection.qty > 1 && setActiveSelection(prev => ({ ...prev, qty: prev.qty - 1 }))} 
                           className="p-3 hover:text-[#D4A373] transition-colors"
                         >
                            <Minus className="w-4 h-4" />
                         </button>
                         <span className="w-10 text-center font-black text-lg">{activeSelection.qty}</span>
                         <button 
                           onClick={() => setActiveSelection(prev => ({ ...prev, qty: prev.qty + 1 }))} 
                           className="p-3 hover:text-[#D4A373] transition-colors"
                         >
                            <Plus className="w-4 h-4" />
                         </button>
                      </div>

                      <button 
                        onClick={() => addToCart(activeSelection)}
                        className="bg-[#D4A373] text-[#1A0F0A] px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#FDF8F5] transition-all flex items-center gap-2 shadow-xl"
                      >
                         Add to Cart <Sparkles className="w-4 h-4" />
                      </button>
                      
                      <button onClick={() => setActiveSelection(null)} className="p-2 opacity-40 hover:opacity-100 transition-opacity">
                         <X className="w-5 h-5" />
                      </button>
                   </div>
                </div>
             </motion.div>
         )}
      </AnimatePresence>

      {/* Professional Success Popup */}
      <AnimatePresence>
         {showSuccess && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
               <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }}
                 onClick={() => setShowSuccess(false)}
                 className="absolute inset-0 bg-[#1A0F0A]/80 backdrop-blur-xl"
               />
               <motion.div 
                 initial={{ scale: 0.8, y: 50, opacity: 0 }}
                 animate={{ scale: 1, y: 0, opacity: 1 }}
                 exit={{ scale: 0.8, y: 50, opacity: 0 }}
                 className="relative bg-[#FDF8F5] p-10 md:p-16 rounded-[60px] shadow-3xl max-w-lg w-full text-center border border-[#D4A373]/20"
               >
                  <div className="space-y-8">
                     <div className="flex flex-col items-center gap-2">
                        <Sparkles className="w-8 h-8 text-[#D4A373] animate-pulse" />
                        <h4 className="text-xl md:text-2xl font-playfair font-black tracking-tighter text-[#2C1810]">
                           BREWED<span className="text-[#3D4A3A]">CRAFT</span>
                        </h4>
                        <div className="w-12 h-[1px] bg-[#D4A373]/30" />
                     </div>

                     <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#2C1810]">Selection Confirmed.</h2>
                        <p className="text-sm opacity-60 font-light italic leading-relaxed">
                           Your masterpieces are now being prepared at the atelier. We will notify you once they are ready for the sanctuary.
                        </p>
                     </div>

                     <button 
                       onClick={() => setShowSuccess(false)}
                       className="w-full bg-[#2C1810] text-[#FDF8F5] py-6 rounded-full font-black uppercase text-[10px] tracking-[0.4em] shadow-2xl hover:bg-[#D4A373] hover:text-[#1A0F0A] transition-all"
                     >
                        Continue Exploring
                     </button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-16 bg-[#2C1810] text-center border-t border-white/5 pb-32">
         <p className="text-[10px] uppercase tracking-[0.5em] text-[#FDF8F5]/30 font-bold">
            BREWED CRAFT ARTISANAL COLLECTIVE • {new Date().getFullYear()}
         </p>
      </footer>
    </main>
  );
}
