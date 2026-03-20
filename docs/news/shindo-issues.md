---
title: Shindo Life Issues
description: Current issues and vulnerabilities in Shindo Life (since ~01.03.2025)
outline: [2, 3]
---

# Shindo Life Issues

> Relevant since **~01.03.2025** · by lewisky

---

## 1. Banning players via green quests

The Rell team added an anti-cheat against auto-farming that hasn't been updated since launch.

**How it worked:** taking a green quest spawns a hidden entity far outside the map. Teleporting to it instantly bans the account. Easy to bypass by coordinates.

People started **abusing this to ban innocent players** — only works on maps with green quests.

**Example:** one of Ray Kerada's skills works well to grab a player and teleport them to that entity. The target is locked from below while you stay above.

**Why did the player count drop?** People were banning ~500 innocent players on Ember every day. Appeals for this ban category are not accepted — the ban was issued by the game itself.

::: danger Do not stay on maps with green quests
:::

---

## 2. Bans via fake clips

Exploiting moderator incompetence — banning any player with a fake clip (e.g. using a script to change names). Moderators either don't review reports or don't play Roblox.

Half of bans are for in-game mechanics or rare game bugs:

- Aizen mode has a range-increase mechanic for some skills (Ashura, etc.) — moderators don't know about it
- If a squad kills you and their skill bugs you out — you fly off randomly. That's also a ban, even though it's not your fault

---

## 3. Server crashes

Crashing servers using an auto-clicker / script with rapid martial arts switching.

---

## 4. Player data rollback

Exploiting a vulnerability — setting an invalid value in player data to cause a rollback / prevent saving:

```lua
game:GetService("Players").LocalPlayer.startevent:FireServer("band", "\128")

local tpsrv = game:GetService("TeleportService")
tpsrv:Teleport(game.PlaceId, game.Players.LocalPlayer)
```

Used for:
- Getting unlimited RC via RELL bloodline cooldown reset
- Easy Celestial race
- Buying a high rank with Rell Coins then rolling back the cost

::: info Rank, Pro Rank and Rep are saved separately — they cannot be rolled back
:::

---

## 5. Buying limited items via ID swap

Getting any blue limited items through replacing `[ID]` in the Rell Shop with the desired bloodline / element / item.
