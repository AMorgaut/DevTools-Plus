# DevTools Plus

DevTools Protocol Extension module

## Introduction

This module expect to extend the V8 Remote Debugger with features provided by the Chrome v1.2/1.3, or more, Remote Protocol version

## Multi-target

One of the goals is to not be specific to node.js, but to be adaptable to other JavaScript environments (Wakanda? React Native like engines?)

## Network

The main feature to expose is, in first place the `Network` protocol
The Node.js debugger clearly miss the Web Page level Network panel.

Let's start by working on the HTTP client module.
We may then think about exposing the HTTP server, Web Sockets, TCP, UDP and other network communication protocols.

## Elements

Nowadays, even if Web engines are the main JavaScript UI renderers, they are not the only ones. Let's mention QML (Qt) and TvML (Apple TvOS), or Android/iOS platforms via NativeScript or React Native.

It would then make sense to be able to expose those view state via this excellent DevTools `Elements` panel.
