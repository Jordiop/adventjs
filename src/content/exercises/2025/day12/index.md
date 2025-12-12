# Batalla de Elfos 

Dos elfos están jugando una batalla por turnos. Cada uno tiene un mazo de movimientos que se representan como un string donde cada carácter es una acción.

A Ataque normal: causa 1 punto de daño si no es bloqueado
B Bloqueo: bloquea un ataque normal (A)
F Ataque fuerte: causa 2 puntos de daño, no puede ser bloqueado
Ambos elfos comienzan con 3 puntos de vida. El primer elfo que llegue a 0 puntos de vida o menos pierde y la batalla termina inmediatamente (no se siguen procesando más movimientos).

Reglas por ronda

Si ambos usan ataque (A o F), ambos reciben daño según el tipo.
B bloquea A, pero no bloquea F.
Todo se resuelve simultáneamente.
Tu tarea

Devuelve el resultado de la batalla como un número:

1 → si el Elfo 1 gana
2 → si el Elfo 2 gana
0 → si empatan (ambos llegan a 0 a la vez o terminan con la misma vida)
elfBattle('A', 'B')
// Ronda 1: A vs B -> Elfo 2 bloquea
// Resultado: Elfo 1 = 3 de vida
//            Elfo 2 = 3 de vida
// → 0

elfBattle('F', 'B')
// Ronda 1: F vs B -> Elfo 2 recibe 2 de daño (F no se bloquea)
// Resultado: Elfo 1 = 3 de vida
//            Elfo 2 = 1 de vida
// → 1

elfBattle('AAB', 'BBA')
// R1: A vs B → Elfo 2 bloquea
// R2: A vs B → Elfo 2 bloquea
// R3: B vs A → Elfo 1 bloquea
// Resultado: Elfo 1 = 3, Elfo 2 = 3
// → 0

elfBattle('AFA', 'BBA')
// R1: A vs B → Elfo 2 bloquea
// R2: F vs B → Elfo 2 recibe 2 de daño (F no se bloquea)
// R3: A vs A → ambos -1
// Resultado: Elfo 1 = 2, Elfo 2 = 0
// → 1

elfBattle('AFAB', 'BBAF')
// R1: A vs B → Elfo 2 bloquea
// R2: F vs B → Elfo 2 recibe 2 de daño (F no se bloquea)
// R3: A vs A → ambos -1 → Elfo 2 llega a 0 ¡Batalla termina!
// R4: no se juega, ya que Elfo 2 no tiene vida
// → 1

elfBattle('AA', 'FF')
// R1: A vs F → Elfo 1 -2, Elfo 2 -1
// R2: A vs F → Elfo 1 -2, Elfo 2 -1 → Elfo 1 llega a -1
// → 2

```typescript
// Without optimizing anything, 6 / 8 stars
function elfBattle(elf1: string, elf2: string): number {
  let hp1 = 3;
  let hp2 = 3;
  
  const rounds = Math.max(elf1.length, elf2.length);
  
  for (let i = 0; i < rounds; i++) {
    if (hp1 <= 0 || hp2 <= 0) break;
    
    const move1 = elf1[i] || '';
    const move2 = elf2[i] || '';
    
    if (!move1 && !move2) break;
    
    let damage1 = 0;
    let damage2 = 0; 
    
    if (move2 === 'A') {
      if (move1 !== 'B') {
        damage1 = 1;
      }
    } else if (move2 === 'F') {
      damage1 = 2;
    }
    
    if (move1 === 'A') {
      if (move2 !== 'B') {
        damage2 = 1;
      }
    } else if (move1 === 'F') {
      damage2 = 2;
    }
    
    hp1 -= damage1;
    hp2 -= damage2;
  }
  
  if (hp1 <= 0 && hp2 <= 0) return 0;
  if (hp1 <= 0) return 2; 
  if (hp2 <= 0) return 1; 

  if (hp1 > hp2) return 1;
  if (hp2 > hp1) return 2;
  return 0; 
}

// Optimized version, 7 / 8 stars
function elfBattle(elf1: string, elf2: string): number {
  let hp1 = 3;
  let hp2 = 3;
  
  const rounds = Math.max(elf1.length, elf2.length);
  
  for (let i = 0; i < rounds; i++) {
    if (hp1 <= 0 || hp2 <= 0) break;
    
    const move1 = elf1[i];
    const move2 = elf2[i];
    
    if (!move1 && !move2) break;
    
    const getDamage = (attacker: string, defender: string): number => {
      if (attacker === 'F') return 2;
      if (attacker === 'A' && defender !== 'B') return 1;
      return 0;
    };
    
    hp1 -= getDamage(move2, move1);
    hp2 -= getDamage(move1, move2);
  }
  
  if (hp1 <= 0 && hp2 <= 0) return 0;
  if (hp1 <= 0) return 2;
  if (hp2 <= 0) return 1;
  if (hp1 === hp2) return 0;
  
  return hp1 > hp2 ? 1 : 2;
}

// after 32145232213 changes 8/8
function elfBattle(elf1: string, elf2: string): number {
  const calculateDamage = (attackMove: string, defenseMove: string): number => {
    if (attackMove === 'F') return 2;
    return (attackMove === 'A' && defenseMove !== 'B') ? 1 : 0;
  };

  let hp1 = 3;
  let hp2 = 3;
  
  const rounds = Math.max(elf1.length, elf2.length);

  for (let i = 0; i < rounds && hp1 > 0 && hp2 > 0; i++) {
    const move1 = elf1[i];
    const move2 = elf2[i];
    
    hp1 -= calculateDamage(move2, move1);

    hp2 -= calculateDamage(move1, move2);
  }
  
  if (hp1 === hp2) return 0;
  return hp1 > hp2 ? 1 : 2;
}

```