import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import { t } from '../../i18n/index.ts';

interface PuzzleGameScreenProps {
    onBack: () => void;
}

interface PuzzlePiece {
    id: number;
    correctRow: number;
    correctCol: number;
    currentRow: number;
    currentCol: number;
    isPlaced: boolean;
}

// Canvas üzerinde çizilecek resimler
interface PuzzleScene {
    name: string;
    bgColor: string;
    draw: (ctx: CanvasRenderingContext2D, w: number, h: number, row: number, col: number, rows: number, cols: number) => void;
}

// Sahne çizimleri - her parça kendi bölgesini çizer
const PUZZLE_SCENES: PuzzleScene[] = [
    {
        name: 'Köpek',
        bgColor: '#FFE4B5',
        draw: (ctx, w, h) => {
            // Çim
            ctx.fillStyle = '#90EE90';
            ctx.fillRect(0, h * 0.7, w, h * 0.3);

            // Gökyüzü
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, w, h * 0.7);

            // Güneş
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(w * 0.8, h * 0.15, w * 0.08, 0, Math.PI * 2);
            ctx.fill();

            // Bulut
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(w * 0.2, h * 0.12, w * 0.05, 0, Math.PI * 2);
            ctx.arc(w * 0.26, h * 0.1, w * 0.06, 0, Math.PI * 2);
            ctx.arc(w * 0.33, h * 0.12, w * 0.05, 0, Math.PI * 2);
            ctx.fill();

            // Köpek gövdesi
            ctx.fillStyle = '#D2691E';
            ctx.beginPath();
            ctx.ellipse(w * 0.5, h * 0.55, w * 0.2, h * 0.12, 0, 0, Math.PI * 2);
            ctx.fill();

            // Köpek kafası
            ctx.fillStyle = '#D2691E';
            ctx.beginPath();
            ctx.arc(w * 0.35, h * 0.42, w * 0.12, 0, Math.PI * 2);
            ctx.fill();

            // Kulaklar
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.ellipse(w * 0.28, h * 0.34, w * 0.04, h * 0.08, -0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(w * 0.42, h * 0.34, w * 0.04, h * 0.08, 0.3, 0, Math.PI * 2);
            ctx.fill();

            // Gözler
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(w * 0.32, h * 0.4, w * 0.02, 0, Math.PI * 2);
            ctx.arc(w * 0.38, h * 0.4, w * 0.02, 0, Math.PI * 2);
            ctx.fill();

            // Burun
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(w * 0.35, h * 0.46, w * 0.025, 0, Math.PI * 2);
            ctx.fill();

            // Kuyruk
            ctx.strokeStyle = '#D2691E';
            ctx.lineWidth = w * 0.03;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(w * 0.7, h * 0.52);
            ctx.quadraticCurveTo(w * 0.8, h * 0.35, w * 0.75, h * 0.38);
            ctx.stroke();

            // Bacaklar
            ctx.fillStyle = '#D2691E';
            ctx.fillRect(w * 0.36, h * 0.62, w * 0.04, h * 0.12);
            ctx.fillRect(w * 0.44, h * 0.62, w * 0.04, h * 0.12);
            ctx.fillRect(w * 0.56, h * 0.62, w * 0.04, h * 0.12);
            ctx.fillRect(w * 0.64, h * 0.62, w * 0.04, h * 0.12);
        }
    },
    {
        name: 'Ev',
        bgColor: '#98FB98',
        draw: (ctx, w, h) => {
            // Gökyüzü
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, w, h * 0.6);

            // Çim
            ctx.fillStyle = '#228B22';
            ctx.fillRect(0, h * 0.6, w, h * 0.4);

            // Güneş
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(w * 0.85, h * 0.12, w * 0.08, 0, Math.PI * 2);
            ctx.fill();

            // Ev gövdesi
            ctx.fillStyle = '#FFE4B5';
            ctx.fillRect(w * 0.25, h * 0.4, w * 0.5, h * 0.35);

            // Çatı
            ctx.fillStyle = '#8B0000';
            ctx.beginPath();
            ctx.moveTo(w * 0.2, h * 0.4);
            ctx.lineTo(w * 0.5, h * 0.15);
            ctx.lineTo(w * 0.8, h * 0.4);
            ctx.closePath();
            ctx.fill();

            // Kapı
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(w * 0.42, h * 0.55, w * 0.16, h * 0.2);

            // Kapı kolu
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(w * 0.54, h * 0.65, w * 0.015, 0, Math.PI * 2);
            ctx.fill();

            // Pencereler
            ctx.fillStyle = '#ADD8E6';
            ctx.fillRect(w * 0.3, h * 0.48, w * 0.08, h * 0.08);
            ctx.fillRect(w * 0.62, h * 0.48, w * 0.08, h * 0.08);

            // Pencere çerçeveleri
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.strokeRect(w * 0.3, h * 0.48, w * 0.08, h * 0.08);
            ctx.strokeRect(w * 0.62, h * 0.48, w * 0.08, h * 0.08);

            // Çiçekler
            const flowerColors = ['#FF69B4', '#FFD700', '#FF6347'];
            [0.15, 0.22, 0.78, 0.85].forEach((x, i) => {
                ctx.fillStyle = '#228B22';
                ctx.fillRect(w * x - 2, h * 0.72, 4, h * 0.08);
                ctx.fillStyle = flowerColors[i % 3];
                ctx.beginPath();
                ctx.arc(w * x, h * 0.72, w * 0.025, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    },
    {
        name: 'Kedi',
        bgColor: '#E6E6FA',
        draw: (ctx, w, h) => {
            // Oda arka planı
            ctx.fillStyle = '#FFF8DC';
            ctx.fillRect(0, 0, w, h);

            // Zemin
            ctx.fillStyle = '#DEB887';
            ctx.fillRect(0, h * 0.75, w, h * 0.25);

            // Yastık/Minder
            ctx.fillStyle = '#FF69B4';
            ctx.beginPath();
            ctx.ellipse(w * 0.5, h * 0.7, w * 0.25, h * 0.1, 0, 0, Math.PI * 2);
            ctx.fill();

            // Kedi gövdesi
            ctx.fillStyle = '#808080';
            ctx.beginPath();
            ctx.ellipse(w * 0.5, h * 0.55, w * 0.15, h * 0.12, 0, 0, Math.PI * 2);
            ctx.fill();

            // Kedi kafası
            ctx.fillStyle = '#808080';
            ctx.beginPath();
            ctx.arc(w * 0.5, h * 0.38, w * 0.12, 0, Math.PI * 2);
            ctx.fill();

            // Kulaklar (üçgen)
            ctx.fillStyle = '#808080';
            ctx.beginPath();
            ctx.moveTo(w * 0.38, h * 0.32);
            ctx.lineTo(w * 0.42, h * 0.2);
            ctx.lineTo(w * 0.46, h * 0.32);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(w * 0.54, h * 0.32);
            ctx.lineTo(w * 0.58, h * 0.2);
            ctx.lineTo(w * 0.62, h * 0.32);
            ctx.fill();

            // İç kulaklar
            ctx.fillStyle = '#FFB6C1';
            ctx.beginPath();
            ctx.moveTo(w * 0.40, h * 0.30);
            ctx.lineTo(w * 0.42, h * 0.24);
            ctx.lineTo(w * 0.44, h * 0.30);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(w * 0.56, h * 0.30);
            ctx.lineTo(w * 0.58, h * 0.24);
            ctx.lineTo(w * 0.60, h * 0.30);
            ctx.fill();

            // Gözler
            ctx.fillStyle = '#90EE90';
            ctx.beginPath();
            ctx.ellipse(w * 0.45, h * 0.36, w * 0.03, h * 0.04, 0, 0, Math.PI * 2);
            ctx.ellipse(w * 0.55, h * 0.36, w * 0.03, h * 0.04, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.ellipse(w * 0.45, h * 0.36, w * 0.012, h * 0.025, 0, 0, Math.PI * 2);
            ctx.ellipse(w * 0.55, h * 0.36, w * 0.012, h * 0.025, 0, 0, Math.PI * 2);
            ctx.fill();

            // Burun
            ctx.fillStyle = '#FFB6C1';
            ctx.beginPath();
            ctx.moveTo(w * 0.5, h * 0.42);
            ctx.lineTo(w * 0.47, h * 0.45);
            ctx.lineTo(w * 0.53, h * 0.45);
            ctx.closePath();
            ctx.fill();

            // Bıyıklar
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            [-1, 1].forEach(side => {
                ctx.beginPath();
                ctx.moveTo(w * 0.5, h * 0.44);
                ctx.lineTo(w * (0.5 + side * 0.15), h * 0.42);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(w * 0.5, h * 0.45);
                ctx.lineTo(w * (0.5 + side * 0.16), h * 0.45);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(w * 0.5, h * 0.46);
                ctx.lineTo(w * (0.5 + side * 0.15), h * 0.48);
                ctx.stroke();
            });

            // Kuyruk
            ctx.strokeStyle = '#808080';
            ctx.lineWidth = w * 0.04;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(w * 0.65, h * 0.55);
            ctx.quadraticCurveTo(w * 0.85, h * 0.45, w * 0.8, h * 0.35);
            ctx.stroke();
        }
    },
    {
        name: 'Araba',
        bgColor: '#B0E0E6',
        draw: (ctx, w, h) => {
            // Gökyüzü
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, w, h * 0.6);

            // Yol
            ctx.fillStyle = '#4a4a4a';
            ctx.fillRect(0, h * 0.6, w, h * 0.4);

            // Yol çizgisi
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 4;
            ctx.setLineDash([20, 15]);
            ctx.beginPath();
            ctx.moveTo(0, h * 0.8);
            ctx.lineTo(w, h * 0.8);
            ctx.stroke();
            ctx.setLineDash([]);

            // Bulutlar
            ctx.fillStyle = '#FFFFFF';
            [[0.15, 0.15], [0.75, 0.1]].forEach(([x, y]) => {
                ctx.beginPath();
                ctx.arc(w * x, h * y, w * 0.04, 0, Math.PI * 2);
                ctx.arc(w * (x + 0.05), h * (y - 0.02), w * 0.05, 0, Math.PI * 2);
                ctx.arc(w * (x + 0.1), h * y, w * 0.04, 0, Math.PI * 2);
                ctx.fill();
            });

            // Araba gövdesi
            ctx.fillStyle = '#FF4444';
            ctx.beginPath();
            ctx.roundRect(w * 0.2, h * 0.45, w * 0.6, h * 0.18, 10);
            ctx.fill();

            // Araba üst kısmı
            ctx.fillStyle = '#FF4444';
            ctx.beginPath();
            ctx.roundRect(w * 0.32, h * 0.3, w * 0.36, h * 0.17, 8);
            ctx.fill();

            // Camlar
            ctx.fillStyle = '#ADD8E6';
            ctx.fillRect(w * 0.35, h * 0.33, w * 0.12, h * 0.1);
            ctx.fillRect(w * 0.5, h * 0.33, w * 0.15, h * 0.1);

            // Tekerlekler
            ctx.fillStyle = '#222222';
            ctx.beginPath();
            ctx.arc(w * 0.32, h * 0.63, w * 0.07, 0, Math.PI * 2);
            ctx.arc(w * 0.68, h * 0.63, w * 0.07, 0, Math.PI * 2);
            ctx.fill();

            // Jantlar
            ctx.fillStyle = '#C0C0C0';
            ctx.beginPath();
            ctx.arc(w * 0.32, h * 0.63, w * 0.035, 0, Math.PI * 2);
            ctx.arc(w * 0.68, h * 0.63, w * 0.035, 0, Math.PI * 2);
            ctx.fill();

            // Farlar
            ctx.fillStyle = '#FFFF00';
            ctx.beginPath();
            ctx.arc(w * 0.78, h * 0.52, w * 0.025, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FF0000';
            ctx.beginPath();
            ctx.arc(w * 0.22, h * 0.52, w * 0.02, 0, Math.PI * 2);
            ctx.fill();
        }
    },
    {
        name: 'Kelebek',
        bgColor: '#E8F5E9',
        draw: (ctx, w, h) => {
            // Gökyüzü gradyanı
            const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
            skyGrad.addColorStop(0, '#87CEEB');
            skyGrad.addColorStop(1, '#E0F7FA');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, w, h);

            // Çimenler
            ctx.fillStyle = '#4CAF50';
            ctx.fillRect(0, h * 0.8, w, h * 0.2);

            // Çiçekler
            [[0.15, 0.85], [0.35, 0.88], [0.65, 0.83], [0.85, 0.87]].forEach(([x, y], i) => {
                const colors = ['#FF69B4', '#FFD700', '#FF6347', '#9C27B0'];
                ctx.fillStyle = '#228B22';
                ctx.fillRect(w * x - 2, h * y, 4, h * 0.1);
                ctx.fillStyle = colors[i];
                ctx.beginPath();
                for (let p = 0; p < 5; p++) {
                    const angle = (p / 5) * Math.PI * 2;
                    ctx.arc(w * x + Math.cos(angle) * 8, h * y + Math.sin(angle) * 8, 6, 0, Math.PI * 2);
                }
                ctx.arc(w * x, h * y, 5, 0, Math.PI * 2);
                ctx.fill();
            });

            // Kelebek gövdesi
            ctx.fillStyle = '#4A148C';
            ctx.beginPath();
            ctx.ellipse(w * 0.5, h * 0.45, w * 0.02, h * 0.12, 0, 0, Math.PI * 2);
            ctx.fill();

            // Sol kanatlar
            ctx.fillStyle = '#E91E63';
            ctx.beginPath();
            ctx.ellipse(w * 0.35, h * 0.38, w * 0.12, h * 0.1, -0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(w * 0.38, h * 0.52, w * 0.1, h * 0.08, 0.3, 0, Math.PI * 2);
            ctx.fill();

            // Sağ kanatlar
            ctx.beginPath();
            ctx.ellipse(w * 0.65, h * 0.38, w * 0.12, h * 0.1, 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(w * 0.62, h * 0.52, w * 0.1, h * 0.08, -0.3, 0, Math.PI * 2);
            ctx.fill();

            // Kanat desenleri
            ctx.fillStyle = '#FCE4EC';
            [[0.32, 0.38], [0.68, 0.38], [0.36, 0.52], [0.64, 0.52]].forEach(([x, y]) => {
                ctx.beginPath();
                ctx.arc(w * x, h * y, w * 0.03, 0, Math.PI * 2);
                ctx.fill();
            });

            // Antenler
            ctx.strokeStyle = '#4A148C';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(w * 0.48, h * 0.33);
            ctx.quadraticCurveTo(w * 0.44, h * 0.25, w * 0.42, h * 0.22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(w * 0.52, h * 0.33);
            ctx.quadraticCurveTo(w * 0.56, h * 0.25, w * 0.58, h * 0.22);
            ctx.stroke();

            // Anten uçları
            ctx.fillStyle = '#4A148C';
            ctx.beginPath();
            ctx.arc(w * 0.42, h * 0.22, 4, 0, Math.PI * 2);
            ctx.arc(w * 0.58, h * 0.22, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    },
    {
        name: 'Balık',
        bgColor: '#B3E5FC',
        draw: (ctx, w, h) => {
            // Deniz gradyanı
            const seaGrad = ctx.createLinearGradient(0, 0, 0, h);
            seaGrad.addColorStop(0, '#4FC3F7');
            seaGrad.addColorStop(1, '#01579B');
            ctx.fillStyle = seaGrad;
            ctx.fillRect(0, 0, w, h);

            // Kabarcıklar
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            [[0.1, 0.2], [0.2, 0.5], [0.8, 0.3], [0.9, 0.7], [0.15, 0.8]].forEach(([x, y]) => {
                ctx.beginPath();
                ctx.arc(w * x, h * y, w * 0.02 + Math.random() * w * 0.02, 0, Math.PI * 2);
                ctx.fill();
            });

            // Deniz yosunları
            ctx.fillStyle = '#2E7D32';
            [[0.1, 0.3], [0.85, 0.35]].forEach(([x, height]) => {
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    ctx.moveTo(w * (x + i * 0.03), h);
                    ctx.quadraticCurveTo(w * (x + i * 0.03 + 0.02), h * (1 - height * 0.5), w * (x + i * 0.03), h * (1 - height));
                    ctx.quadraticCurveTo(w * (x + i * 0.03 - 0.02), h * (1 - height * 0.5), w * (x + i * 0.03), h);
                    ctx.fill();
                }
            });

            // Balık gövdesi
            ctx.fillStyle = '#FF9800';
            ctx.beginPath();
            ctx.ellipse(w * 0.5, h * 0.45, w * 0.2, h * 0.15, 0, 0, Math.PI * 2);
            ctx.fill();

            // Kuyruk
            ctx.beginPath();
            ctx.moveTo(w * 0.7, h * 0.45);
            ctx.lineTo(w * 0.85, h * 0.3);
            ctx.lineTo(w * 0.85, h * 0.6);
            ctx.closePath();
            ctx.fill();

            // Yüzgeçler
            ctx.fillStyle = '#FFB74D';
            ctx.beginPath();
            ctx.moveTo(w * 0.5, h * 0.32);
            ctx.lineTo(w * 0.55, h * 0.18);
            ctx.lineTo(w * 0.6, h * 0.32);
            ctx.closePath();
            ctx.fill();

            // Göz
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(w * 0.38, h * 0.42, w * 0.05, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(w * 0.36, h * 0.42, w * 0.025, 0, Math.PI * 2);
            ctx.fill();

            // Pullar
            ctx.strokeStyle = '#E65100';
            ctx.lineWidth = 1;
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.arc(w * (0.45 + i * 0.05), h * 0.45, w * 0.03, 0, Math.PI, true);
                ctx.stroke();
            }
        }
    },
    {
        name: 'Roket',
        bgColor: '#1A237E',
        draw: (ctx, w, h) => {
            // Uzay arka planı
            ctx.fillStyle = '#0D1B2A';
            ctx.fillRect(0, 0, w, h);

            // Yıldızlar
            ctx.fillStyle = '#FFFFFF';
            for (let i = 0; i < 30; i++) {
                const size = 1 + Math.random() * 2;
                ctx.beginPath();
                ctx.arc(Math.random() * w, Math.random() * h, size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Ay
            ctx.fillStyle = '#ECEFF1';
            ctx.beginPath();
            ctx.arc(w * 0.85, h * 0.15, w * 0.08, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#CFD8DC';
            ctx.beginPath();
            ctx.arc(w * 0.83, h * 0.13, w * 0.02, 0, Math.PI * 2);
            ctx.arc(w * 0.88, h * 0.17, w * 0.015, 0, Math.PI * 2);
            ctx.fill();

            // Roket gövdesi
            ctx.fillStyle = '#E0E0E0';
            ctx.beginPath();
            ctx.moveTo(w * 0.5, h * 0.15);
            ctx.lineTo(w * 0.4, h * 0.6);
            ctx.lineTo(w * 0.6, h * 0.6);
            ctx.closePath();
            ctx.fill();

            // Roket burnu
            ctx.fillStyle = '#F44336';
            ctx.beginPath();
            ctx.moveTo(w * 0.5, h * 0.1);
            ctx.lineTo(w * 0.45, h * 0.2);
            ctx.lineTo(w * 0.55, h * 0.2);
            ctx.closePath();
            ctx.fill();

            // Kanatlar
            ctx.fillStyle = '#F44336';
            ctx.beginPath();
            ctx.moveTo(w * 0.4, h * 0.5);
            ctx.lineTo(w * 0.3, h * 0.65);
            ctx.lineTo(w * 0.4, h * 0.6);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(w * 0.6, h * 0.5);
            ctx.lineTo(w * 0.7, h * 0.65);
            ctx.lineTo(w * 0.6, h * 0.6);
            ctx.closePath();
            ctx.fill();

            // Pencere
            ctx.fillStyle = '#29B6F6';
            ctx.beginPath();
            ctx.arc(w * 0.5, h * 0.35, w * 0.06, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#757575';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Alev
            ctx.fillStyle = '#FF9800';
            ctx.beginPath();
            ctx.moveTo(w * 0.42, h * 0.6);
            ctx.lineTo(w * 0.5, h * 0.85);
            ctx.lineTo(w * 0.58, h * 0.6);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#FFEB3B';
            ctx.beginPath();
            ctx.moveTo(w * 0.45, h * 0.6);
            ctx.lineTo(w * 0.5, h * 0.75);
            ctx.lineTo(w * 0.55, h * 0.6);
            ctx.closePath();
            ctx.fill();
        }
    },
    {
        name: 'Tren',
        bgColor: '#C8E6C9',
        draw: (ctx, w, h) => {
            // Gökyüzü
            ctx.fillStyle = '#81D4FA';
            ctx.fillRect(0, 0, w, h * 0.6);

            // Çim
            ctx.fillStyle = '#66BB6A';
            ctx.fillRect(0, h * 0.6, w, h * 0.25);

            // Ray
            ctx.fillStyle = '#795548';
            ctx.fillRect(0, h * 0.82, w, h * 0.05);
            ctx.fillStyle = '#5D4037';
            for (let i = 0; i < 12; i++) {
                ctx.fillRect(w * (i / 12) + 5, h * 0.8, w * 0.04, h * 0.1);
            }

            // Lokomotif
            ctx.fillStyle = '#D32F2F';
            ctx.fillRect(w * 0.15, h * 0.45, w * 0.35, h * 0.3);

            // Baca
            ctx.fillStyle = '#424242';
            ctx.fillRect(w * 0.2, h * 0.3, w * 0.08, h * 0.15);

            // Duman
            ctx.fillStyle = 'rgba(150,150,150,0.7)';
            [[0.22, 0.25], [0.18, 0.18], [0.26, 0.12]].forEach(([x, y]) => {
                ctx.beginPath();
                ctx.arc(w * x, h * y, w * 0.04, 0, Math.PI * 2);
                ctx.fill();
            });

            // Kabin
            ctx.fillStyle = '#1565C0';
            ctx.fillRect(w * 0.35, h * 0.35, w * 0.15, h * 0.25);

            // Pencereler
            ctx.fillStyle = '#BBDEFB';
            ctx.fillRect(w * 0.38, h * 0.4, w * 0.04, h * 0.08);
            ctx.fillRect(w * 0.44, h * 0.4, w * 0.04, h * 0.08);

            // Tekerlekler
            ctx.fillStyle = '#212121';
            [[0.22, 0.77], [0.35, 0.77], [0.45, 0.77]].forEach(([x, y]) => {
                ctx.beginPath();
                ctx.arc(w * x, h * y, w * 0.055, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#757575';
                ctx.beginPath();
                ctx.arc(w * x, h * y, w * 0.025, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#212121';
            });

            // Vagon
            ctx.fillStyle = '#43A047';
            ctx.fillRect(w * 0.55, h * 0.5, w * 0.35, h * 0.22);
            ctx.fillStyle = '#A5D6A7';
            [[0.6, 0.54], [0.72, 0.54], [0.84, 0.54]].forEach(([x, y]) => {
                ctx.fillRect(w * x, h * y, w * 0.06, h * 0.1);
            });

            // Vagon tekerlekleri
            ctx.fillStyle = '#212121';
            [[0.62, 0.77], [0.82, 0.77]].forEach(([x, y]) => {
                ctx.beginPath();
                ctx.arc(w * x, h * y, w * 0.04, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    }
];

const PuzzleGameScreen: React.FC<PuzzleGameScreenProps> = ({ onBack }) => {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
    const [draggingPiece, setDraggingPiece] = useState<PuzzlePiece | null>(null);
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
    const [showSuccess, setShowSuccess] = useState(false);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pieceCanvasRefs = useRef<Map<number, HTMLCanvasElement>>(new Map());
    const boardRef = useRef<HTMLDivElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Seviyeye göre grid boyutu - 4x4'e kadar
    const gridConfig = useMemo(() => {
        if (level <= 2) return { rows: 2, cols: 2 }; // 4 parça
        if (level <= 4) return { rows: 2, cols: 3 }; // 6 parça  
        if (level <= 6) return { rows: 3, cols: 3 }; // 9 parça
        return { rows: 4, cols: 4 }; // 16 parça
    }, [level]);

    const { rows, cols } = gridConfig;
    const totalPieces = rows * cols;
    const currentScene = PUZZLE_SCENES[currentSceneIndex % PUZZLE_SCENES.length];

    // Ses çalma
    const playSound = useCallback((type: 'pick' | 'place' | 'wrong' | 'success') => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            }
            const ctx = audioContextRef.current;

            if (type === 'pick') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = 400;
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
            } else if (type === 'place') {
                [523, 659].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.15);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + i * 0.08);
                    osc.stop(ctx.currentTime + i * 0.08 + 0.15);
                });
            } else if (type === 'wrong') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.value = 150;
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.15);
            } else if (type === 'success') {
                [523, 659, 784, 1047].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.2);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + i * 0.1);
                    osc.stop(ctx.currentTime + i * 0.1 + 0.2);
                });
            }
        } catch (e) {
            console.log('Audio error:', e);
        }
    }, []);

    // Ana resmi çiz ve parçalara böl
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const size = 300;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Tam resmi çiz
        currentScene.draw(ctx, size, size, 0, 0, rows, cols);

        // Parçaları oluştur
        const newPieces: PuzzlePiece[] = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                newPieces.push({
                    id: row * cols + col,
                    correctRow: row,
                    correctCol: col,
                    currentRow: -1,
                    currentCol: -1,
                    isPlaced: false
                });
            }
        }

        // Karıştır
        const shuffled = [...newPieces].sort(() => Math.random() - 0.5);
        setPieces(shuffled);
        setShowSuccess(false);
        setDraggingPiece(null);
    }, [level, currentSceneIndex, rows, cols, currentScene]);

    // Her parça için canvas çiz
    const renderPieceCanvas = useCallback((pieceCanvas: HTMLCanvasElement | null, piece: PuzzlePiece) => {
        if (!pieceCanvas || !canvasRef.current) return;

        const mainCanvas = canvasRef.current;
        const pieceWidth = mainCanvas.width / cols;
        const pieceHeight = mainCanvas.height / rows;

        pieceCanvas.width = pieceWidth;
        pieceCanvas.height = pieceHeight;

        const ctx = pieceCanvas.getContext('2d');
        if (!ctx) return;

        // Ana canvas'tan parçayı kes
        ctx.drawImage(
            mainCanvas,
            piece.correctCol * pieceWidth,
            piece.correctRow * pieceHeight,
            pieceWidth,
            pieceHeight,
            0, 0,
            pieceWidth, pieceHeight
        );

        // Kenar çizgisi
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, pieceWidth, pieceHeight);
    }, [cols, rows]);

    // Sürükleme başlat
    const handlePointerDown = useCallback((e: React.PointerEvent, piece: PuzzlePiece) => {
        if (piece.isPlaced || showSuccess) return;

        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);

        setDraggingPiece(piece);
        setDragPos({ x: e.clientX, y: e.clientY });
        playSound('pick');
    }, [showSuccess, playSound]);

    // Sürükleme
    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!draggingPiece) return;
        e.preventDefault();
        setDragPos({ x: e.clientX, y: e.clientY });
    }, [draggingPiece]);

    // Sürükleme bırak
    const handlePointerUp = useCallback((e: React.PointerEvent) => {
        if (!draggingPiece || !boardRef.current) {
            setDraggingPiece(null);
            return;
        }

        const boardRect = boardRef.current.getBoundingClientRect();
        const x = e.clientX - boardRect.left;
        const y = e.clientY - boardRect.top;

        const cellWidth = boardRect.width / cols;
        const cellHeight = boardRect.height / rows;

        const dropCol = Math.floor(x / cellWidth);
        const dropRow = Math.floor(y / cellHeight);

        // Grid içinde mi?
        if (dropCol >= 0 && dropCol < cols && dropRow >= 0 && dropRow < rows) {
            // Doğru yere mi?
            if (dropCol === draggingPiece.correctCol && dropRow === draggingPiece.correctRow) {
                // Doğru!
                setPieces(prev => prev.map(p =>
                    p.id === draggingPiece.id
                        ? { ...p, currentRow: dropRow, currentCol: dropCol, isPlaced: true }
                        : p
                ));
                setScore(prev => prev + 10);
                playSound('place');
            } else {
                // Yanlış yer
                playSound('wrong');
            }
        }

        setDraggingPiece(null);
    }, [draggingPiece, cols, rows, playSound]);

    // Tamamlanma kontrolü
    useEffect(() => {
        if (pieces.length > 0 && pieces.every(p => p.isPlaced)) {
            setShowSuccess(true);
            playSound('success');

            setTimeout(() => {
                setShowSuccess(false);
                setLevel(prev => prev + 1);
                setCurrentSceneIndex(prev => prev + 1);
            }, 2500);
        }
    }, [pieces, playSound]);

    const unplacedPieces = pieces.filter(p => !p.isPlaced);
    // 4x4 için daha küçük parçalar
    const pieceSize = rows >= 4 ? Math.min(55, 220 / cols) : Math.min(70, 280 / cols);
    const boardSize = pieceSize * Math.max(cols, rows) + 16;

    return (
        <div
            className="fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 flex flex-col overflow-hidden"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{ touchAction: 'none' }}
        >
            {/* Hidden main canvas for rendering */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/20 backdrop-blur-sm">
                <button
                    onClick={onBack}
                    className="w-11 h-11 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-purple-600" />
                </button>
                <div className="text-center">
                    <h1 className="text-xl font-bold text-white drop-shadow-lg">
                        🧩 {t('miniGames.puzzle.title', 'Yapboz')}
                    </h1>
                    <p className="text-white/80 text-xs">
                        {t('miniGames.puzzle.level', 'Seviye')} {level} - {totalPieces} {t('miniGames.puzzle.pieces', 'Parça')}
                    </p>
                </div>
                <div className="bg-white/90 rounded-full px-4 py-2 shadow-lg">
                    <span className="text-purple-600 font-bold">⭐ {score}</span>
                </div>
            </div>

            {/* Talimat */}
            <div className="text-center py-2">
                <p className="text-white font-medium drop-shadow-md">
                    🎯 {currentScene.name} {t('miniGames.puzzle.complete', 'yapbozunu tamamla!')}
                </p>
            </div>

            {/* Oyun alanı */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
                {/* Puzzle board - hedef alan */}
                <div
                    ref={boardRef}
                    className="relative rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                        width: boardSize,
                        height: (pieceSize * rows) + 20,
                        backgroundColor: currentScene.bgColor,
                        padding: 10
                    }}
                >
                    {/* Grid hücreleri */}
                    <div
                        className="grid gap-1"
                        style={{
                            gridTemplateColumns: `repeat(${cols}, ${pieceSize}px)`,
                            gridTemplateRows: `repeat(${rows}, ${pieceSize}px)`
                        }}
                    >
                        {Array.from({ length: totalPieces }).map((_, i) => {
                            const row = Math.floor(i / cols);
                            const col = i % cols;
                            const placedPiece = pieces.find(p => p.isPlaced && p.correctRow === row && p.correctCol === col);

                            return (
                                <div
                                    key={i}
                                    className="rounded-lg flex items-center justify-center overflow-hidden"
                                    style={{
                                        width: pieceSize,
                                        height: pieceSize,
                                        backgroundColor: placedPiece ? 'transparent' : 'rgba(0,0,0,0.1)',
                                        border: '2px dashed rgba(0,0,0,0.2)'
                                    }}
                                >
                                    {placedPiece && (
                                        <canvas
                                            ref={(el) => {
                                                if (el) {
                                                    pieceCanvasRefs.current.set(placedPiece.id, el);
                                                    renderPieceCanvas(el, placedPiece);
                                                }
                                            }}
                                            className="w-full h-full"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Parça havuzu */}
                <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 min-h-[100px]">
                    <p className="text-white/80 text-sm text-center mb-2">
                        {t('miniGames.puzzle.dragHint', 'Parçaları yukarı sürükle')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {unplacedPieces.map((piece) => (
                            <div
                                key={piece.id}
                                className={`cursor-grab active:cursor-grabbing rounded-lg shadow-lg overflow-hidden transition-transform
                                    ${draggingPiece?.id === piece.id ? 'opacity-50' : 'hover:scale-105'}`}
                                style={{
                                    width: pieceSize,
                                    height: pieceSize,
                                    touchAction: 'none'
                                }}
                                onPointerDown={(e) => handlePointerDown(e, piece)}
                            >
                                <canvas
                                    ref={(el) => {
                                        if (el) {
                                            pieceCanvasRefs.current.set(piece.id + 100, el);
                                            renderPieceCanvas(el, piece);
                                        }
                                    }}
                                    className="w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sürüklenen parça */}
            {draggingPiece && (
                <div
                    className="fixed pointer-events-none z-50 rounded-lg shadow-2xl overflow-hidden"
                    style={{
                        left: dragPos.x - pieceSize / 2,
                        top: dragPos.y - pieceSize / 2,
                        width: pieceSize,
                        height: pieceSize,
                        transform: 'scale(1.1)'
                    }}
                >
                    <canvas
                        ref={(el) => {
                            if (el) renderPieceCanvas(el, draggingPiece);
                        }}
                        className="w-full h-full"
                    />
                </div>
            )}

            {/* İpucu */}
            <div className="text-center pb-4">
                <p className="text-white/60 text-sm">
                    💡 {t('miniGames.puzzle.hint', 'Her parça sadece doğru yerine oturur')}
                </p>
            </div>

            {/* Başarı overlay */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-bounce">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold text-purple-600 mb-2">
                            {t('miniGames.excellent', 'Harika!')}
                        </h2>
                        <p className="text-gray-600">
                            {t('miniGames.puzzle.completed', 'Yapbozu tamamladın!')}
                        </p>
                        <p className="text-lg text-orange-500 font-bold mt-2">+{totalPieces * 10} ⭐</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PuzzleGameScreen;
