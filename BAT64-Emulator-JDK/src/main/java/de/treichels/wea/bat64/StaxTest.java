package de.treichels.wea.bat64;

import java.io.FileNotFoundException;

import javax.xml.stream.XMLStreamException;

import de.treichels.wea.bat64.xml.XmlElement;
import de.treichels.wea.bat64.xml.XmlReader;
import de.treichels.wea.bat64.xml.XmlWriter;

public class StaxTest {
	private static void dumpElement(final XmlElement e, final int level) {
		final String tagName = e.getName();
		final int typeinfo = e.getTypeinfo();

		if (e.hasText()) {
			// element with text - start & stop tag on one line
			System.out.printf("%s<%s typeinfo=\"%d\">%s</%s>\n", indent(level), tagName, typeinfo, e.getText(), tagName);
		} else if (e.isEmpty()) {
			// empty element
			System.out.printf("%s<%s typeinfo=\"%d\" />\n", indent(level), tagName, typeinfo);
		} else {
			// element with children - start tag
			System.out.printf("%s<%s typeinfo=\"%d\">\n", indent(level), tagName, typeinfo);

			// children
			for (final XmlElement child : e.values()) {
				dumpElement(child, level + 1);
			}

			// stop tag
			System.out.printf("%s</%s>\n", indent(level), tagName);
		}
	}

	private static String indent(final int level) {
		final StringBuffer sb = new StringBuffer(level * 3);

		for (int i = level; i > 0; i--) {
			sb.append("   ");
		}

		return sb.toString();
	}

	public static void main(final String[] args) throws FileNotFoundException, XMLStreamException {
		final XmlReader reader = new XmlReader();
		final XmlElement rootElement = reader.read("F4U-1D Corsair.model");

		dumpElement(rootElement, 0);

		final XmlWriter writer = new XmlWriter();
		writer.write(rootElement, "test.xml");
	}
}