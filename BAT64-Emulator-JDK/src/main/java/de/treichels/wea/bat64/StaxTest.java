package de.treichels.wea.bat64;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.Map;
import java.util.Stack;
import java.util.TreeMap;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;

public class StaxTest {
	public static class Element {
		public final String name;
		public final int typeinfo;
		String text = null;
		Map<String, Element> children = new TreeMap<String, Element>();

		public Element(final String name, final int typeinfo) {
			this.name = name;
			this.typeinfo = typeinfo;
		}

		public boolean hasChildren() {
			return !children.isEmpty();
		}

		public boolean hasText() {
			return text != null;
		}
	}

	private static final String TYPEINFO = "typeinfo";

	private static void dumpElement(final Element e, final int level) {
		if (e.hasText()) {
			// element with text - start & stop tag on one line
			System.out.printf("%s<%s typeinfo=\"%d\">%s</%s>\n", indent(level), e.name, e.typeinfo, e.text, e.name);
		} else if (e.hasChildren()) {
			// element with children - start tag
			System.out.printf("%s<%s typeinfo=\"%d\">\n", indent(level), e.name, e.typeinfo);

			// children
			for (final Element child : e.children.values()) {
				dumpElement(child, level + 1);
			}

			// stop tag
			System.out.printf("%s</%s>\n", indent(level), e.name);
		} else {
			// empty element
			System.out.printf("%s<%s typeinfo=\"%d\" />\n", indent(level), e.name, e.typeinfo);
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
		final XMLInputFactory factory = XMLInputFactory.newFactory();
		final XMLStreamReader reader = factory.createXMLStreamReader(new FileReader(new File("F4U-1D Corsair.model")));
		final Stack<Element> stack = new Stack<Element>();
		Element rootElement = null;

		while (reader.hasNext()) {
			switch (reader.next()) {
			case XMLStreamConstants.START_ELEMENT:
				final String tagName = reader.getLocalName();
				final int typeinfo = Integer.parseInt(reader.getAttributeValue(null, TYPEINFO));

				final Element e = new Element(tagName, typeinfo);
				if (stack.isEmpty()) {
					rootElement = e;
				} else {
					stack.peek().children.put(tagName, e);
				}
				stack.push(e);
				break;

			case XMLStreamConstants.CHARACTERS:
				if (!reader.isWhiteSpace()) {
					stack.peek().text = reader.getText().trim();
				}
				break;

			case XMLStreamConstants.END_ELEMENT:
				stack.pop();
			}
		}

		reader.close();

		dumpElement(rootElement, 0);
	}
}