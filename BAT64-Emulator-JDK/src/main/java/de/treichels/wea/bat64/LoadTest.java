package de.treichels.wea.bat64;

import de.treichels.wea.bat64.gen.Root;
import de.treichels.wea.bat64.xml.Marshaller;
import de.treichels.wea.bat64.xml.Unmarshaller;
import de.treichels.wea.bat64.xml.XmlElement;
import de.treichels.wea.bat64.xml.XmlReader;
import de.treichels.wea.bat64.xml.XmlWriter;

public class LoadTest {
	public static void main(final String[] args) throws Exception {
		final XmlReader reader = new XmlReader();
		final XmlWriter writer = new XmlWriter();

		final XmlElement rootElement = reader.read("aaaFull2.model");
		final Root root = new Root();
		Unmarshaller.unmarshal(rootElement, root, null);

		final XmlElement rootElement2 = new XmlElement("root", 32, null);
		Marshaller.marshal(root, rootElement2);
		writer.write(rootElement2, "Full3.model");
	}
}
