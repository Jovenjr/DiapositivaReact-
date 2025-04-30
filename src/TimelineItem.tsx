import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heading, Text, FlexBox, Box } from 'spectacle';
import { FaCircle } from 'react-icons/fa';

interface TimelineItemProps {
  hitoStr: string;
  isActive: boolean;
  slideNumber: number;
  index: number;
  previousYearStr?: string; // Año del hito anterior para comparación
  typingSpeed?: number; // Milisegundos por caracter
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  hitoStr,
  isActive,
  slideNumber,
  index,
  previousYearStr,
  typingSpeed = 50, // Velocidad por defecto
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const itemRef = useRef<HTMLDivElement>(null); // Ref para el scrollIntoView

  // --- Lógica para extraer datos del hito (movida aquí) ---
  const yearMatch = hitoStr.match(/^(\d{4})/);
  const year = yearMatch ? yearMatch[1] : '';

  const previousYearMatch = previousYearStr?.match(/^(\d{4})/);
  const previousYear = previousYearMatch ? previousYearMatch[1] : '';
  const showYearTextInactive = year !== previousYear;

  const matchLey = hitoStr.match(/^(Ley|Decreto|Comité|Constitución|IPAC|OGP|DIGEIG|Plan|NORTIC|SAIP|Política|Indicadores|Gabinete|CPTA)\s*([\w\-]+)?/i);
  const tipoHito = matchLey ? matchLey[1] : '';
  const numeroHito = matchLey ? matchLey[2] : '';
  let textoPrincipal = hitoStr;
  if (yearMatch) {
    textoPrincipal = textoPrincipal.substring(yearMatch[0].length).trim();
     if (textoPrincipal.startsWith(':')) {
         textoPrincipal = textoPrincipal.substring(1).trim();
     }
  }
  const textoLey = matchLey ? `${tipoHito}${numeroHito ? ' ' + numeroHito : ''}` : '';
  if (matchLey && textoPrincipal.toLowerCase().startsWith(textoLey.toLowerCase())) {
    textoPrincipal = textoPrincipal.substring(textoLey.length).trim();
  }
  // --- Fin lógica extracción ---

  // Efecto para el scroll
  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }, [isActive]);

  // Efecto para el cursor parpadeante
  useEffect(() => {
    if (isActive) {
      cursorIntervalRef.current = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
    } else {
      setShowCursor(false);
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    }
    return () => {
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, [isActive]);

  // Efecto para la animación de escritura
  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    setDisplayedText('');

    if (isActive) {
      let charIndex = 0;
      const typeChar = () => {
        setDisplayedText(textoPrincipal.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex < textoPrincipal.length) {
          typingTimeoutRef.current = setTimeout(typeChar, typingSpeed);
        }
      };
      typeChar();
    } else {
      setDisplayedText(textoPrincipal);
    }

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [isActive, textoPrincipal, typingSpeed]);

  return (
    <motion.div
      ref={itemRef} // Añadir ref aquí
      key={index}
      id={`hito-${slideNumber}-${index}`}
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 10 }}
      transition={{ duration: 0.5 }}
      style={{
        marginBottom: '30px',
        borderLeft: `5px solid ${isActive ? '#0d47a1' : '#1976d2'}`,
      }}
    >
      {isActive ? (
        <Box maxWidth="40%" paddingLeft='20px'>
          <Heading fontFamily="Poppins" fontWeight="bold" fontSize="88px" color="#0d47a1" margin="0" lineHeight="1">
            {year}
          </Heading>
          <Box height="6px" width="120px" backgroundColor="#0d47a1" margin="6px 0 14px 0" />
          {textoLey && (
            <Text fontFamily="Poppins" fontStyle="italic" fontSize="40px" color="#555" margin="0 0 8px 0" lineHeight="1">
              {textoLey}
            </Text>
          )}
          {/* Renderizar el texto que se está escribiendo */}
          <Text as="div" fontFamily="Poppins" fontWeight="bold" fontSize="40px" color="#000" margin="0" lineHeight="1.1" style={{ minHeight: '53px' /* Ajustar si es necesario para evitar saltos */ }}>
            {displayedText}
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                backgroundColor: 'currentColor',
                marginLeft: '2px',
                opacity: showCursor ? 1 : 0,
                verticalAlign: 'baseline',
                transition: 'opacity 0.2s'
              }}
            ></span>
          </Text>
        </Box>
      ) : (
        <FlexBox alignItems="center" paddingLeft='20px'>
          <FaCircle size="15px" color="#1976d2" style={{ marginRight: '15px', flexShrink: 0 }} />
          {showYearTextInactive && (
            <Text fontFamily="Poppins" fontSize="24px" color="#1976d2" margin="0" lineHeight="1.2" fontWeight="bold">
              {year}
            </Text>
          )}
        </FlexBox>
      )}
    </motion.div>
  );
};
