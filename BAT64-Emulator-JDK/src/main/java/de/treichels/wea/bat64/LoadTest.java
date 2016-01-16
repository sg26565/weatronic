package de.treichels.wea.bat64;

import javax.xml.stream.XMLStreamException;

import de.treichels.wea.bat64.gen.Root;
import de.treichels.wea.bat64.xml.XmlElement;
import de.treichels.wea.bat64.xml.XmlReader;

public class LoadTest {
	public static void main(final String[] args)
			throws XMLStreamException, InstantiationException, IllegalAccessException {
		final XmlReader reader = new XmlReader();
		final XmlElement rootElement = reader.read("F4U-1D Corsair.model");

		final Root root = new Root();
		root.load(rootElement);
	}
}
